const clone = require("lodash.clonedeep");

module.exports = (object, update) => {
  const o = clone(object);

  if (!update) {
    return o;
  }

  const updateKeys = Object.keys(update);
  for (key of updateKeys) {
    const item = update[key];
    if (typeof item === "object") {
      const itemKeys = Object.keys(item);
      for (itemKey of itemKeys) {
        o[key][itemKey] = item[itemKey];
      }
    } else {
      o[key] = clone(update[key]);
    }
  }

  return o;
};
