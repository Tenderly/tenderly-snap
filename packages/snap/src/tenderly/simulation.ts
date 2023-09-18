import { divider, heading, panel, Panel, text } from '@metamask/snaps-ui';
import { Json } from '@metamask/utils';
import { TenderlyApi, TenderlySnapVersion } from '../constants';
import { fetchCredentials, TenderlyCredentials } from './credentials-access';
import { formatResponse, formatSimulationUrl } from './formatter';
import { hex2int, requestSnapPrompt } from './utils';

/**
 * Updates the credentials associated with Tenderly project.
 *
 * @param origin - The origin of the request.
 */
export async function handleSendTenderlyTransaction(origin: string) {
  return requestSnapPrompt(
    panel([
      heading(`${origin} wants to send the transaction`),
      text('Enter your transaction payload:'),
    ]),
    '{ "data": "0x..." }',
  );
}

/**
 * Fetches all networks supported by Tenderly.
 */
export async function fetchPublicTenderlyNetworks() {
  const response = await fetch(`${TenderlyApi}/v1/public-networks`, {
    method: 'GET',
  });

  return await response.json();
}

/**
 * This is the main function that handles the simulation of a transaction.
 * It fetches the credentials required for the Tenderly simulation, submits the transaction data to the Tenderly API,
 * handles any errors returned by the API, and if there are no errors,
 * formats the response received from the Tenderly API for output.
 *
 * @param transaction - The transaction to simulate.
 * @param transactionOrigin - The origin of the transaction.
 */
export async function simulate(
  transaction: { [key: string]: Json },
  transactionOrigin: string,
): Promise<Panel> {
  const credentials: TenderlyCredentials | null = await fetchCredentials();

  if (!credentials) {
    return panel([
      text(
        '🚨 Your Tenderly credentials seem incorrect or incomplete. Please visit https://dashboard.tenderly.co/account/authorization and connect to Tenderly Snap. If the issue persists, reach out to metamask.snap@tenderly.co for further assistance.',
      ),
    ]);
  }

  // Get chain id
  const chainId = await ethereum.request({ method: 'eth_chainId' });
  const networkId = hex2int(chainId as string);

  if (!chainId) {
    throw new Error('Chain ID is not provided.');
  }

  // Fetch Tenderly-supported networks
  const tenderlyNetworks = await fetchPublicTenderlyNetworks();

  if (!tenderlyNetworks) {
    throw new Error('No Tenderly-supported networks are provided.');
  }

  const networkIds: number[] = tenderlyNetworks.map((network: any) =>
    Number(network.id),
  );

  // Check if the network is supported by Tenderly
  if (!networkIds.includes(networkId as number)) {
    throw new Error(
      `Chain ID ${chainId} (${networkId}) is not supported by Tenderly.`,
    );
  }

  // Simulate a transaction
  const [from] = (await ethereum.request({
    method: 'eth_requestAccounts',
  })) as string[];

  const simulationResponse = await submitSimulation(
    transactionOrigin,
    transaction,
    credentials,
    networkId,
  );
  const err = catchError(simulationResponse, credentials);

  return err || formatResponse(from, simulationResponse, credentials);
}

/**
 * This function sends a request to the Tenderly API to simulate a transaction.
 * It prepares the transaction data, sends it to the API, and if the simulation is successful,
 * it makes the simulation publicly accessible.
 *
 * @param transactionOrigin - The origin of the transaction.
 * @param transaction - The transaction to simulate.
 * @param credentials - Tenderly credentials object.
 * @param networkId - Tenderly network id.
 */
async function submitSimulation(
  transactionOrigin: string,
  transaction: { [key: string]: Json },
  credentials: TenderlyCredentials,
  networkId: number | null,
) {
  const response = await fetch(
    `${TenderlyApi}/v1/account/${credentials.accountId}/project/${credentials.projectId}/simulate`,
    {
      method: 'POST',
      body: JSON.stringify({
        from: transaction.from,
        to: transaction.to,
        input: transaction.data,
        gas: hex2int(transaction.gas),
        gas_price: hex2int(transaction.maxFeePerGas),
        value: hex2int(transaction.value),
        network_id: networkId,
        save: true,
        save_if_fails: true,
        simulation_type: 'full',
        source: `Tenderly Snap ${TenderlySnapVersion}: ${transactionOrigin}`,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': credentials.accessToken,
      },
    },
  );

  const parsedResponse = await response.json();

  // Make the simulation publicly accessible
  if (parsedResponse?.simulation?.id) {
    await fetch(
      `${TenderlyApi}/v1/account/${credentials.accountId}/project/${credentials.projectId}/simulations/${parsedResponse.simulation.id}/share`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': credentials.accessToken,
        },
      },
    );
  }

  return parsedResponse;
}

/**
 * This function handles any errors that might occur during the simulation of the transaction.
 * It checks if a transaction or error message is included in the data returned from the simulation,
 * and if an error is found, it creates a formatted error response.
 *
 * @param data - Simulation API response.
 * @param credentials - Tenderly credentials object.
 * @returns Panel - MetaMask Snap panel.
 */
function catchError(data: any, credentials: TenderlyCredentials): Panel | null {
  if (!data.transaction) {
    if (data.error) {
      // Skip when error is "insufficient funds for gas * price + value"
      const showNoteMessage =
        data.error.slug !== 'invalid_transaction_simulation';

      return panel([
        heading('❌ Error'),
        text(`**${data.error.message}**`),
        ...(showNoteMessage
          ? [
              divider(),
              text(
                'Please, reconnect the snap. If the problem persists, contact Tenderly support at support@tenderly.co.',
              ),
            ]
          : []),
      ]);
    }

    return panel([
      heading('❌ Invalid response'),
      divider(),
      text(JSON.stringify(data)),
    ]);
  } else if (data.transaction.error_info) {
    const callTrace = data.transaction.transaction_info?.call_trace;
    const call = callTrace?.calls ? callTrace.calls?.[0] : null;
    const errorMessage = call?.error || null;

    return panel([
      heading(`❌ Error in ${data.transaction.error_info.address}:`),
      divider(),
      text(data.transaction.error_info.error_message),
      ...(errorMessage ? [text(`Error Message: ${errorMessage}`)] : []),
      divider(),
      ...formatSimulationUrl(data, credentials),
    ]);
  }

  return null;
}
