type Indexed<T = unknown> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const target: Indexed = {};

  const merger = (obj: Indexed) => {
    for (const prop in obj) {
      if (Object.prototype.toString.call(obj[prop]) === "[object Object]") {
        target[prop] = merge(target[prop] as Indexed, obj[prop] as Indexed);
      } else {
        target[prop] = obj[prop];
      }
    }
  };

  merger(lhs);
  merger(rhs);

  return target;
}
