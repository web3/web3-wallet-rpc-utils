import { OwnedAsset } from "./types";

export function parseToGetOwnedAssetsResult(result: unknown[]): OwnedAsset[] {
  return result as OwnedAsset[];
}
