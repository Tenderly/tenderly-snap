import { expect } from '@jest/globals';
import { isTenderlyDomain } from '../utils';

describe('Tenderly Utils', () => {
  describe('isTenderlyDomain', () => {
    it('returns true', () => {
      expect(isTenderlyDomain('https://dashboard.tenderly.co')).toBe(true);
      expect(isTenderlyDomain('https://dashboard.tenderly.co/')).toBe(true);
      expect(
        isTenderlyDomain('https://dashboard.tenderly.co/account/authorization'),
      ).toBe(true);

      expect(isTenderlyDomain('https://dashboard.tenderly.co?test=123')).toBe(
        true,
      );

      expect(
        isTenderlyDomain(
          'https://dashboard.tenderly.co/tx/mainnet/0xa25266fb400027add84eebdcd300d5404859dd5c4ec56a0f37e88c4df0246857?trace=0',
        ),
      ).toBe(true);

      expect(
        isTenderlyDomain(
          'https://dashboard.tenderly.co/dzimiks-tenderly/metamask-snap/simulator/new?block=&blockIndex=0&from=0x0000000000000000000000000000000000000000&gas=8000000&gasPrice=0&value=0',
        ),
      ).toBe(true);
    });

    it('returns false', () => {
      expect(isTenderlyDomain('http://dashboard.tenderly.co')).toBe(false);
      expect(isTenderlyDomain('http://tenderly.co')).toBe(false);
      expect(isTenderlyDomain('https://dashboard.tenderly.com')).toBe(false);
      expect(isTenderlyDomain('https://tenderly.com')).toBe(false);
      expect(isTenderlyDomain('https://google.com/tenderly.co')).toBe(false);
      expect(isTenderlyDomain('https://tenderly.co.website.com')).toBe(false);
      expect(
        isTenderlyDomain('https://dashboard.tenderly.co.website.com'),
      ).toBe(false);
      expect(isTenderlyDomain('https://status.tenderly.co')).toBe(false);
      expect(isTenderlyDomain('https://tenderly.co')).toBe(false);
      expect(isTenderlyDomain('https://tenderly.co/devnets')).toBe(false);
      expect(isTenderlyDomain('https://tenderly.co/?test=123')).toBe(false);
    });
  });
});
