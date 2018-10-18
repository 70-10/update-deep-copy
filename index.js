const clone = require("lodash.clonedeep");

module.exports = (object, changeSet) => {
  const cloneObject = clone(object);
  return changeSet ? update(cloneObject, changeSet) : cloneObject;
};

function update(obj, changeSet) {
  const updateReduce = (state, key) => {
    const change = changeSet[key];

    if (typeof change === "undefined") {
      delete state[key];
      return state;
    }

    if (!change) {
      state[key] = change;
      return state;
    }

    if (typeof change === "object" && !Array.isArray(change)) {
      state[key] = update(state[key], change);
      return state;
    }

    state[key] = clone(change);
    return state;
  };

  return Object.keys(changeSet).reduce(updateReduce, obj || {});
}
