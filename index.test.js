const update = require(".");

test("no-update is clone deep", () => {
  const object = {
    a: 1,
    b: ["test"],
    c: { test: "test" }
  };

  const result = update(object);
  expect(result).not.toBe(object);
  expect(result).toEqual(object);
});

test("no-update is clone deep for Array", () => {
  const object = [
    {
      a: 1,
      b: ["test"],
      c: { test: "test" }
    }
  ];

  const result = update(object);

  expect(result).not.toBe(object);
  expect(result[0].a).toBe(object[0].a);
  expect(result[0].b).not.toBe(object[0].b);
  expect(result[0].c).not.toBe(object[0].c);
  expect(result).toEqual(object);
});

test("add key-value", () => {
  const state = { a: "a" };
  expect(update(state, { b: "b" })).toEqual({ a: "a", b: "b" });
});

test("update no exists key", () => {
  const object = {
    a: 1,
    b: ["test"],
    c: { test: "test" }
  };

  expect(update(object, { d: "fuga" })).toEqual({
    a: 1,
    b: ["test"],
    c: { test: "test" },
    d: "fuga"
  });
});

test("update exists key", () => {
  const object = {
    a: 1,
    b: ["test"],
    c: { test: "test" }
  };

  expect(update(object, { b: ["test", "fuga"] })).toEqual({
    a: 1,
    b: ["test", "fuga"],
    c: { test: "test" }
  });
});

test("update - store state at redux", () => {
  const state = {
    user: {
      name: {
        first: "taro",
        last: "tanaka"
      }
    }
  };

  const action = {
    edit: {
      name: {
        first: "hanako",
        last: "yamada"
      }
    }
  };

  expect(
    update(state, {
      user: { name: action.edit.name }
    })
  ).toEqual({
    user: { name: { first: "hanako", last: "yamada" } }
  });
});

test("Update nested object", () => {
  const state = {
    user: {
      name: "alex",
      age: 20
    }
  };

  expect(update(state, { user: { age: 21 } })).toEqual({
    user: { name: "alex", age: 21 }
  });
});

test("Update array", () => {
  const state = [1, 2, 3, 4];

  expect(update(state, [2, 3, 4, 5])).toEqual([2, 3, 4, 5]);
});

test("add nested array", () => {
  const state = {
    name: "users",
    list: [
      {
        name: "alex",
        age: 21
      },
      {
        name: "Ann",
        age: 30
      }
    ]
  };

  expect(
    update(state, {
      list: [{ name: "Joe", age: 18 }, { name: "alex", age: 22 }]
    })
  ).toEqual({
    name: "users",
    list: [{ name: "Joe", age: 18 }, { name: "alex", age: 22 }]
  });
});

test("Update nested array", () => {
  const state = {
    name: "users",
    list: [
      {
        name: "alex",
        age: 21
      },
      {
        name: "Ann",
        age: 30
      }
    ]
  };

  expect(
    update(state, {
      list: [{ name: "alex", age: 22 }]
    })
  ).toEqual({
    name: "users",
    list: [{ name: "alex", age: 22 }]
  });
});

test("update from undefiened", () => {
  const state = { a: 1, b: undefined };
  expect(update(state, { b: 2 })).toEqual({ a: 1, b: 2 });
});

test("update to undefiened", () => {
  const state = { a: 1, b: 2 };
  expect(update(state, { b: undefined })).toEqual({ a: 1 });
});

test("update from null", () => {
  const state = { a: 1, b: null };
  expect(update(state, { b: 2 })).toEqual({ a: 1, b: 2 });
});

test("update to null", () => {
  const state = { a: 1, b: 2 };
  expect(update(state, { b: null })).toEqual({ a: 1, b: null });
});

test("state is empty object", () => {
  const state = {};
  expect(update(state, { a: { b: "" } })).toEqual({
    a: { b: "" }
  });
});

test("state is no exists", () => {
  const state = { a: 1 };
  expect(update(state, { b: { c: 2 } })).toEqual({ a: 1, b: { c: 2 } });
});
