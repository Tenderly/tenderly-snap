import { panel, text, heading } from '@metamask/snaps-ui';
import { JsonRpcRequest } from '@metamask/utils';
import { requestSnapPrompt } from './utils';

export type TenderlyCredentials = {
  accountId: string;
  projectId: string;
  accessToken: string;
};

/**
 * Fetches the credentials associated with Tenderly project.
 *
 * @param origin - The origin of the request.
 */
export async function fetchCredentials(
  origin: string,
): Promise<TenderlyCredentials | null> {
  const persistedData: any = await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'get',
    },
  });

  if (!persistedData) {
    await handleUpdateTenderlyCredentials(origin);
    return null;
  }

  return persistedData;
}

/**
 * Updates the credentials associated with Tenderly project.
 *
 * @param origin - The origin of the request.
 */
export async function handleUpdateTenderlyCredentials(origin: string) {
  const tenderlyAccess = await requestNewTenderlyCredentials(origin);

  await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'update',
      newState: tenderlyAccess,
    },
  });

  return null;
}

/**
 * Sets the credentials associated with Tenderly project.
 * This method updates the snap state with the provided Tenderly credentials.
 *
 * @param request - The JSON-RPC request containing Tenderly credentials.
 * @throws Will throw an error if the request object or its params are missing.
 * @throws Will throw an error if any of the required Tenderly credentials are missing.
 * @example
 * await window.ethereum.request({
 *   method: 'wallet_invokeSnap',
 *   params: {
 *     snapId: 'npm:@tenderly/metamask-snap',
 *     request: {
 *       method: 'set_tenderly_credentials',
 *       params: {
 *         accountId: 'TENDERLY_ACCOUNT_ID',
 *         projectId: 'TENDERLY_PROJECT_ID',
 *         accessToken: 'TENDERLY_ACCESS_TOKEN',
 *       },
 *     },
 *   },
 * });
 */
export async function handleSetTenderlyCredentials(
  request: JsonRpcRequest<Record<string, any>>,
) {
  if (!request?.params) {
    throw new Error(
      'Missing request parameters. Please provide the required parameters for Tenderly access.',
    );
  }

  const { accountId, projectId, accessToken } = request.params;

  if (!accountId || !projectId || !accessToken) {
    throw new Error(
      'Invalid request parameters. accountId, projectId, and accessToken are required for Tenderly access.',
    );
  }

  await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'update',
      newState: { accountId, projectId, accessToken },
    },
  });

  return null;
}

/**
 * Requests the new Tenderly credentials.
 *
 * @param origin - The origin of the request.
 */
async function requestNewTenderlyCredentials(
  origin: string,
): Promise<TenderlyCredentials> {
  const credentialsRaw = await requestCredentials(origin);

  if (!credentialsRaw) {
    throw new Error('Request for new Tenderly access failed; missing input');
  }

  const [accountId, projectId, accessToken] = credentialsRaw.split('@');

  if (!accountId || !projectId || !accessToken) {
    throw new Error('Request for new Tenderly access failed; invalid input');
  }

  return {
    accountId,
    projectId,
    accessToken,
  };
}

/**
 * Requests the Tenderly credentials.
 *
 * @param origin - The origin of the request.
 */
async function requestCredentials(origin: string): Promise<string | null> {
  return requestSnapPrompt(
    panel([
      heading(`${origin} wants to add credentials from Tenderly`),
      text('Enter your Tenderly credentials in format:'),
      text('**{account_id}@{project_id}@{access_token}**'),
    ]),
    'accountId@projectId@accessToken',
  );
}
