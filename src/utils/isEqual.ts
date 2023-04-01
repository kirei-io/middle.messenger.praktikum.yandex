type PlainObject<T = any> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export default isEqual;

function my() {
  function isEqual(
    a: Record<string, unknown>,
    b: Record<string, unknown>
  ): boolean {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (
      aKeys.length !== bKeys.length ||
      !aKeys.every((key) => b.hasOwnProperty(key))
    ) {
      return false;
    }

    return aKeys.every((key) => {
      if (
        typeof a[key] === "object" &&
        a[key] !== null &&
        typeof b[key] === "object" &&
        b[key] !== null
      ) {
        return isEqual(
          a[key] as Record<string, unknown>,
          b[key] as Record<string, unknown>
        );
      } else {
        return a[key] === b[key];
      }
    });
  }

  const a = { a: 1 };
  const b = { a: 15 };
  console.log(isEqual(a, b)); // true
}
