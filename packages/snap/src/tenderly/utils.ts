import { Panel } from '@metamask/snaps-ui';
import { Json } from '@metamask/utils';
import BigNumber from 'bignumber.js';

export const hex2int = (hex: string | Json): number | null => {
  return hex ? parseInt(hex.toString(), 16) : null;
};

export const requestSnapPrompt = async (
  content: Panel,
  placeholder: string,
): Promise<string | null> => {
  const res = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content,
      placeholder,
    },
  });
  return res ? res.toString() : null;
};

export const formatNumber = (
  num: string | number,
  decimal = 2,
  opt = {} as BigNumber.Format,
) => {
  const n = new BigNumber(num);
  const format = {
    prefix: '',
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
    suffix: '',
    ...opt,
  };
  // hide the after-point part if number is more than 1000000
  if (n.isGreaterThan(1000000)) {
    if (n.gte(1e9)) {
      return `${n.div(1e9).toFormat(decimal, format)}B`;
    }

    return n.decimalPlaces(0).toFormat(format);
  }

  return n.toFormat(decimal, format);
};

export const formatUsdValue = (value: string) => {
  const bnValue = new BigNumber(value);

  if (bnValue.lt(0)) {
    return `-$${formatNumber(Math.abs(Number(value)))}`;
  }

  if (bnValue.gte(0.01) || bnValue.eq(0)) {
    return `$${formatNumber(value)}`;
  }

  return '<$0.01';
};

export const formatAmount = (amount: string, decimals = 4) => {
  const bnValue = new BigNumber(amount);

  if (bnValue.gt(1e9)) {
    return `${bnValue.div(1e9).toFormat(4)}B`;
  }

  if (bnValue.gt(10000)) {
    return formatNumber(bnValue.toString());
  }

  if (bnValue.gt(1)) {
    return formatNumber(bnValue.toString(), 4);
  }

  if (bnValue.lt(0.00001)) {
    if (bnValue.toString().length > 10) {
      return Number(bnValue.toString()).toExponential(4);
    }

    return bnValue.toString();
  }

  return formatNumber(bnValue.toString(), decimals);
};

export const isTenderlyDomain = (origin: string) => {
  if (!origin) {
    return false;
  }

  return origin.includes('tenderly.co');
};
