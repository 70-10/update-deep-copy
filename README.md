# update-deep-copy

## Install

```
» npm install update-deep-copy
```

## Usage

```js
const update = require("update-deep-copy");

const object = { a: 1, b: { c: "c", d: [0, 1, 2, 3] } };
const copy = update(object, { b: { c: "d" } });
// => { a: 1, b: { c: "d", d: [0, 1, 2, 3] } }
```
