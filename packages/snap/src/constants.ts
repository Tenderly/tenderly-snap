enum CustomRequestMethod {
  UPDATE_TENDERLY_CREDENTIALS = 'update_tenderly_credentials',
  SET_TENDERLY_CREDENTIALS = 'set_tenderly_credentials',
  SEND_TENDERLY_TRANSACTION = 'send_tenderly_transaction',
}

const TenderlyApi = 'https://api.tenderly.co/api';

const TenderlySnapVersion = '1.2.1';

export { CustomRequestMethod, TenderlyApi, TenderlySnapVersion };
