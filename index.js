const clone = require("lodash.clonedeep");

module.exports = (object, changeSet) => {
  const cloneObject = clone(object);
  return changeSet ? update(cloneObject, changeSet) : cloneObject;
};

function update(obj, changeSet) {
  return Object.keys(changeSet).reduce((state, key) => {
    state[key] =
      typeof changeSet[key] === "object" && !Array.isArray(changeSet[key])
        ? update(state[key], changeSet[key])
        : clone(changeSet[key]);
    return state;
  }, obj);
}
