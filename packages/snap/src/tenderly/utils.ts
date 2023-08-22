import { Panel } from '@metamask/snaps-ui';
import { Json } from '@metamask/utils';

/**
 * Converts hex value to integer.
 *
 * @param hex - Hex value.
 * @returns Integer value.
 */
export function hex2int(hex: string | Json): number | null {
  return hex ? parseInt(hex.toString(), 16) : null;
}

/**
 * Todo.
 *
 * @param o - Todo.
 * @param s - Todo.
 * @param r - Todo.
 * @returns String value.
 */
export function strReplaceAll(o: string, s: string, r: string): string {
  return o.replace(new RegExp(s, 'gu'), r);
}

/**
 * Todo.
 *
 * @param arr - Todo.
 * @returns Array value.
 */
export function arrMakeUnique(arr: any[]): any[] {
  return [...new Set(arr)];
}

/**
 * Todo.
 *
 * @param content - Todo.
 * @param placeholder - Todo.
 */
export async function requestSnapPrompt(
  content: Panel,
  placeholder: string,
): Promise<string | null> {
  const res = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content,
      placeholder,
    },
  });
  return res ? res.toString() : null;
}
