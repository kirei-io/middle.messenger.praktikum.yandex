import { merge } from "./merge";

function set(
  object: Record<string, unknown> | unknown,
  path: string,
  value: unknown
): Record<string, unknown> | unknown {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const result = path.split(".").reduceRight<Record<string, unknown>>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );
  return merge(object as Record<string, unknown>, result);
}

export default set;
