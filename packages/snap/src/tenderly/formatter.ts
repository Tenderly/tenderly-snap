import {
  Component,
  copyable,
  divider,
  heading,
  panel,
  Panel,
  text,
} from '@metamask/snaps-ui';
import { TenderlyCredentials } from './credentials-access';

/**
 * This function receives the raw data and credentials of a Tenderly project simulation,
 * calls the individual formatter functions for each relevant section
 * (like balance changes, output value, asset changes, etc.) and returns a panel with all the formatted outputs.
 *
 * @param data - Simulation API data.
 * @param credentials - Tenderly credentials object.
 * @returns Panel with formatted values.
 */
export function formatResponse(
  data: any,
  credentials: TenderlyCredentials,
): Panel {
  const panelOutputs = [
    ...formatAssetChanges(data),
    divider(),
    ...formatSimulationUrl(data, credentials),
  ];

  return panel(panelOutputs);
}

/**
 * This function formats a panel to show any changes to assets, differentiating between ERC20, ERC721, and other changes.
 * If there are no changes, it informs the user.
 *
 * @param data - Simulation API data.
 * @returns Panel outputs with asset changes.
 */
function formatAssetChanges(data: any): Component[] {
  const panelOutputs: Component[] = [heading('Asset Changes:')];
  const assetChanges = data.transaction.transaction_info?.asset_changes;

  if (!assetChanges) {
    panelOutputs.push(text('No asset changes'));
    return panelOutputs;
  }

  const erc20Outputs: Component[] = [text('🪙 **ERC20 Changes:**')];
  const erc721Outputs: Component[] = [text('🖼️ **ERC721 (NFT) Changes:**')];
  const otherOutputs: Component[] = [text('**Other Changes:**')];

  assetChanges.forEach((assetChange: any) => {
    if (assetChange.token_info.standard === 'ERC20') {
      erc20Outputs.push(
        text(
          `**${
            assetChange.token_info.name
          } (${assetChange.token_info.symbol?.toUpperCase()})**`,
        ),
      );
      erc20Outputs.push(text(`Change Type: ${assetChange.type}`));
      erc20Outputs.push(
        text(`Price: $${Number(assetChange.dollar_value).toFixed(4)}`),
      );
      erc20Outputs.push(text(`Amount: ${assetChange.amount}`));
      erc20Outputs.push(divider());
    } else if (assetChange.token_info.standard === 'ERC721') {
      erc721Outputs.push(
        text(
          `**${
            assetChange.token_info.name
          } (${assetChange.token_info.symbol?.toUpperCase()})**`,
        ),
      );
      erc721Outputs.push(text(`Change Type: ${assetChange.type}`));
      erc721Outputs.push(
        text(`Floor Price: $${Number(assetChange.dollar_value).toFixed(4)}`),
      );
      erc721Outputs.push(text(`Amount: ${assetChange.amount}`));
      erc721Outputs.push(divider());
    } else {
      otherOutputs.push(
        text(
          `**${assetChange.token_info.name}** ($${Number(
            assetChange.token_info.dollar_value,
          ).toFixed(4)})`,
        ),
      );
      otherOutputs.push(text(`Change Type: ${assetChange.type}`));
      otherOutputs.push(
        text(
          `Amount: ${assetChange.amount} **($${Number(
            assetChange.dollar_value,
          ).toFixed(4)})**`,
        ),
      );
      otherOutputs.push(divider());
    }
  });

  panelOutputs.push(
    ...(erc20Outputs.length > 1 ? erc20Outputs : []),
    ...(erc721Outputs.length > 1 ? erc721Outputs : []),
    ...(otherOutputs.length > 1 ? otherOutputs : []),
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
