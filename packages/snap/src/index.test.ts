import { installSnap } from '@metamask/snaps-jest';
import { expect } from '@jest/globals';
import { heading, panel, text } from '@metamask/snaps-ui';

describe('onRpcRequest', () => {
  describe('update_tenderly_credentials', () => {
    it('shows a prompt dialog', async () => {
      const { request } = await installSnap();

      const origin = 'Jest';
      const response = request({
        method: 'update_tenderly_credentials',
        origin,
      });

      const ui = await response.getInterface();
      expect(ui.type).toBe('prompt');
      expect(ui).toRender(
        panel([
          heading(`${origin} wants to add credentials from Tenderly`),
          text('Enter your Tenderly credentials in format:'),
          text('**{account_id}@{project_id}@{access_token}**'),
        ]),
      );
    });
  });
});
