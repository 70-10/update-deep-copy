import test from "ava";
import update from "./";

test("no-update is clone deep", t => {
  const object = {
    a: 1,
    b: ["test"],
    c: { test: "test" }
  };

  const result = update(object);

  t.not(result, object);
  t.deepEqual(result, object);
});

test("update no exists key", t => {
  const object = {
    a: 1,
    b: ["test"],
    c: { test: "test" }
  };

  const result = update(object, { d: "fuga" });

  t.deepEqual(result, {
    a: 1,
    b: ["test"],
    c: { test: "test" },
    d: "fuga"
  });
});

test("update exists key", t => {
  const object = {
    a: 1,
    b: ["test"],
    c: { test: "test" }
  };

  const result = update(object, { b: ["test", "fuga"] });

  t.deepEqual(result, {
    a: 1,
    b: ["test", "fuga"],
    c: { test: "test" }
  });
});

test("update - store state at redux", t => {
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

  const result = update(state, {
    user: { name: action.edit.name }
  });

  t.deepEqual(result, {
    user: { name: { first: "hanako", last: "yamada" } }
  });
});
