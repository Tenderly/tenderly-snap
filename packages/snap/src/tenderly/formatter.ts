import {
  Component,
  copyable,
  divider,
  heading,
  panel,
  Panel,
  text,
} from '@metamask/snaps-ui';
import BigNumber from 'bignumber.js';
import { TenderlyCredentials } from './credentials-access';
import { formatAmount, formatUsdValue } from './utils';
import { TransactionAssetChangesResponseData } from './types';

/**
 * This function receives the raw data and credentials of a Tenderly project simulation,
 * calls the individual formatter functions for each relevant section
 * (like balance changes, output value, asset changes, etc.) and returns a panel with all the formatted outputs.
 *
 * @param from - From account that's currently connected.
 * @param data - Simulation API data.
 * @param credentials - Tenderly credentials object.
 * @returns Panel with formatted values.
 */
export function formatResponse(
  from: string,
  data: any,
  credentials: TenderlyCredentials,
): Panel {
  const panelOutputs = [
    ...formatAssetChanges(from, data),
    divider(),
    ...formatSimulationUrl(data, credentials),
  ];

  return panel(panelOutputs);
}

/**
 * This function formats a panel to show any changes to assets, differentiating between ERC20, ERC721, and other changes.
 * If there are no changes, it informs the user.
 *
 * @param from - From account that's currently connected.
 * @param data - Simulation API data.
 * @returns Panel outputs with asset changes.
 */
function formatAssetChanges(from: string, data: any): Component[] {
  const panelOutputs: Component[] = [heading('Asset Changes:')];
  const assetChanges: TransactionAssetChangesResponseData[] =
    data.transaction.transaction_info?.asset_changes;

  if (!assetChanges) {
    panelOutputs.push(text('No asset changes'));
    return panelOutputs;
  }

  const assetsInList: TransactionAssetChangesResponseData[] =
    assetChanges.filter(
      (asset: TransactionAssetChangesResponseData) => asset.to === from,
    ) || [];
  const assetsOutList: TransactionAssetChangesResponseData[] =
    assetChanges.filter(
      (asset: TransactionAssetChangesResponseData) => asset.from === from,
    ) || [];

  const assetsInOutputs: Component[] = [text('✅ **Assets In**')];
  const assetsOutOutputs: Component[] = [text('⚠️ **Assets Out**')];

  // Assets In
  assetsInList.forEach((token: TransactionAssetChangesResponseData) => {
    const isNFT: boolean = token.token_info.standard === 'ERC721';
    const symbolName: string = token.token_info?.symbol?.toUpperCase() || 'N/A';
    const symbol = isNFT ? '🖼' : '🪙';
    const tokenId: string = token.token_id ? ` #${Number(token.token_id)}` : '';
    const tokenName: string = token.token_info?.name || 'N/A';
    const tokenAmount: string = token.amount || '1';

    // Show a token symbol and ID
    assetsInOutputs.push(text(`${symbol} **${symbolName}${tokenId}**`));

    // Show a token name
    assetsInOutputs.push(
      text(`${isNFT ? 'Collection:' : 'Name:'} ${tokenName}`),
    );

    // Show a token amount & dollar value
    assetsInOutputs.push(
      text(
        `${token.type}: + ${formatAmount(tokenAmount)} (≈ ${formatUsdValue(
          new BigNumber(token.dollar_value).toFixed(),
        )})`,
      ),
    );
  });

  // Assets Out
  assetsOutList.forEach((token: TransactionAssetChangesResponseData) => {
    const isNFT: boolean = token.token_info.standard === 'ERC721';
    const symbolName: string = token.token_info?.symbol?.toUpperCase() || 'N/A';
    const symbol = isNFT ? '🖼' : '🪙';
    const tokenId: string = token.token_id ? ` #${Number(token.token_id)}` : '';
    const tokenName: string = token.token_info?.name || 'N/A';
    const tokenAmount: string = token.amount || '1';

    // Show a token symbol and ID
    assetsOutOutputs.push(text(`${symbol} **${symbolName}${tokenId}**`));

    // Show a token name
    assetsOutOutputs.push(
      text(`${isNFT ? 'Collection:' : 'Name:'} ${tokenName}`),
    );

    // Show a token amount & dollar value
    assetsOutOutputs.push(
      text(
        `${token.type}: - ${formatAmount(tokenAmount)} (≈ ${formatUsdValue(
          new BigNumber(token.dollar_value).toFixed(),
        )})`,
      ),
    );
  });

  // Add divider below assets out list if both lists has at least 1 member
  if (assetsInOutputs.length > 1 && assetsOutOutputs.length > 1) {
    assetsOutOutputs.push(divider());
  }

  panelOutputs.push(
    ...(assetsOutOutputs.length > 1 ? assetsOutOutputs : []),
    ...(assetsInOutputs.length > 1 ? assetsInOutputs : []),
  );
  return panelOutputs;
}

/**
 * This function returns a link to the full details of the simulation on the Tenderly Dashboard, and a separate shareable link.
 *
 * @param data - Simulation API data.
 * @param credentials - Tenderly credentials object.
 * @returns Panel with simulation outputs.
 */
export function formatSimulationUrl(
  data: any,
  credentials: TenderlyCredentials,
): Component[] {
  const simulationUrl = `https://dashboard.tenderly.co/${credentials.accountId}/${credentials.projectId}/simulator/${data.simulation?.id}`;
  const sharedSimulationUrl = `https://dashboard.tenderly.co/shared/simulation/${data.simulation?.id}`;

  return [
    heading('Tenderly Dashboard:'),
    text('See full simulation details in Tenderly.'),
    text(
      `**Status:** ${data.transaction?.status ? 'Success ✅' : 'Failed ❌'}`,
    ),
    copyable(`${simulationUrl}`),
    text('Share simulation details with others! 🤗'),
    copyable(`${sharedSimulationUrl}`),
  ];
}
