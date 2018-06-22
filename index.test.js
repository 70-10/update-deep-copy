import test from "ava";
import update from "./index";

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

test("add key-value", t => {
  const state = { a: "a" };
  t.deepEqual(update(state, { b: "b" }), { a: "a", b: "b" });
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

test("Update nested object", t => {
  const state = {
    user: {
      name: "alex",
      age: 20
    }
  };

  const result = update(state, { user: { age: 21 } });

  t.deepEqual(result, { user: { name: "alex", age: 21 } });
});

test("Update array", t => {
  const state = [1, 2, 3, 4];

  t.deepEqual(update(state, [2, 3, 4, 5]), [2, 3, 4, 5]);
});

test("add nested array", t => {
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

  t.deepEqual(
    update(state, {
      list: [{ name: "Joe", age: 18 }, { name: "alex", age: 22 }]
    }),
    {
      name: "users",
      list: [{ name: "Joe", age: 18 }, { name: "alex", age: 22 }]
    }
  );
});

test("Update nested array", t => {
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

  t.deepEqual(
    update(state, {
      list: [{ name: "alex", age: 22 }]
    }),
    {
      name: "users",
      list: [{ name: "alex", age: 22 }]
    }
  );
});

test("update undefiened", t => {
  const state = { a: 1, b: undefined };
  t.deepEqual(update(state, { b: 2 }), { a: 1, b: 2 });
});

test("update to undefiened", t => {
  const state = { a: 1, b: 2 };
  t.deepEqual(update(state, { b: undefined }), { a: 1, b: undefined });
});

test("update to null", t => {
  const state = { a: 1, b: 2 };
  t.deepEqual(update(state, { b: null }), { a: 1, b: null });
});
