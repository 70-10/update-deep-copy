const update = require(".");

const object = { a: 1, b: { c: "c", d: [0, 1, 2, 3] } };
const copy = update(object, { b: { c: "d" } });

console.log(JSON.stringify(copy, null, 2));
