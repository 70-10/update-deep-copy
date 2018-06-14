const clone = require("lodash.clonedeep");

module.exports = (object, update) => {
  const o = clone(object);

  if (!update) {
    return o;
  }

  const updateKeys = Object.keys(update);
  for (key of updateKeys) {
    o[key] = clone(update[key]);
  }

  return o;
};
