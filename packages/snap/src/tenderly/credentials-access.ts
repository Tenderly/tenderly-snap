import { panel, text, heading } from '@metamask/snaps-ui';
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
