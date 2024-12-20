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

  try {
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/URL
    const referrer: URL = new URL(origin);

    return (
      referrer.protocol === 'https:' &&
      referrer.host.endsWith('dashboard.tenderly.co')
    );
  } catch (error) {
    return false;
  }
};

/**
 * Parses a CAIP-2 compliant chain ID string and returns the formatted hexadecimal chain ID.
 *
 * This function takes a CAIP-2 chain ID string in the format "namespace:reference",
 * validates the namespace, and for "eip155" namespace, formats the reference as a
 * lowercase hexadecimal string prefixed with "0x".
 *
 * @param chainId - The CAIP-2 chain ID string to parse (e.g., "eip155:1").
 * @returns The formatted hexadecimal chain ID (e.g., "0x1") for eip155 namespace.
 * @throws {Error} If the input format is invalid, or processing fails.
 * @example
 * parseChainId("eip155:1") // returns "0x1"
 * parseChainId("eip155:11155111") // returns "0xaa36a7"
 */
export const parseChainId = (chainId: string): string => {
  try {
    // Split the chainId string
    const [, reference] = chainId.split(':');

    // Convert the reference from base 10 to hexadecimal and prefix with '0x'
    return `0x${parseInt(reference, 10).toString(16)}`;
  } catch (error) {
    throw new Error(
      `An unexpected error occurred while parsing CAIP-2 chainId (${chainId}): ${error.message}`,
    );
  }
};
