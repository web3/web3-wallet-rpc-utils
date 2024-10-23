import type { GetOwnedAssetsResult } from "./types";

export function parseToGetOwnedAssetsResult(
  result: unknown[],
): GetOwnedAssetsResult {
  return result as GetOwnedAssetsResult;
}
