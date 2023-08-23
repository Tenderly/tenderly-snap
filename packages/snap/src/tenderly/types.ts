type TransactionTokenInfoResponseData = {
  contract_address: string;
  decimals: number;
  dollar_value: string;
  logo: string;
  name: string;
  standard: string;
  symbol: string;
  type: string;
};

type TransactionAssetChangesResponseData = {
  amount: string;
  dollar_value: string;
  from: string;
  raw_amount: string;
  to: string;
  type: string;
  token_id: string;
  token_info: TransactionTokenInfoResponseData;
};

export {
  TransactionTokenInfoResponseData,
  TransactionAssetChangesResponseData,
};
