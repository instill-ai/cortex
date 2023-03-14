import assert from "node:assert/strict";
import { test, describe } from "node:test";
import { dot } from ".";

describe("getter", () => {
  const obj = {
    foo: {
      bar: "yes!",
    },
  };

  test("gets a value by array path", () => {
    assert(dot.getter(obj, ["foo", "bar"]), "yes!");
  });

  test("gets a value by string path", () => {
    assert(dot.getter(obj, "foo.bar"), "yes!");
  });

  test('return "undefined" if value was not found using given path', () => {
    assert.strictEqual(dot.getter(obj, "foo.aar"), undefined);
  });

  test("return defaultValue if value was not found using given path", () => {
    assert(dot.getter(obj, "foo.aar", "no!"), "no!");
  });
});

describe("setter", () => {
  test("sets empty object with number", () => {
    const obj = {};
    dot.setter(obj, "foo", 123);
    assert.strictEqual(obj, { foo: 123 });
  });

  test("sets empty object", () => {
    const obj = {};
    dot.setter(obj, "foo", "bar");
    assert.strictEqual(obj, { foo: "bar" });
  });

  test("sets flat value", () => {
    const obj = { foo: "bar" };
    dot.setter(obj, "flat", "value");
    assert.strictEqual(obj, { foo: "bar", flat: "value" });
  });

  test("removes flat value", () => {
    const obj = { foo: "bar" };
    dot.setter(obj, "foo", undefined);
    assert.strictEqual(obj, {});
  });

  test("sets nested value", () => {
    const obj = { x: "y" };
    dot.setter(obj, "foo.bar", "hi");
    assert.strictEqual(obj, { x: "y", foo: { bar: "hi" } });
  });

  test("updates nested value", () => {
    const obj = { x: "y", foo: { bar: "a" } };
    dot.setter(obj, "foo.bar", "b");
    assert.strictEqual(obj, { x: "y", foo: { bar: "b" } });
  });

  test("removes nested value", () => {
    const obj = { x: "y", foo: { bar: "a" } };
    dot.setter(obj, "foo.bar", undefined);
    assert.strictEqual(obj, { x: "y", foo: { bar: "b" } });
    assert.strictEqual(
      Object.prototype.hasOwnProperty.call(obj.foo, "bar"),
      false
    );
  });

  test("updates deep nested value", () => {
    const obj = { x: "y", twofoldly: { foo: { bar: "a" } } };
    dot.setter(obj, "twofoldly.foo.bar", "b");
    assert.strictEqual(obj, { x: "y", twofoldly: { foo: { bar: "b" } } });
  });

  test("removes deep nested value", () => {
    const obj = { x: "y", twofoldly: { foo: { bar: "a" } } };
    dot.setter(obj, "twofoldly.foo.bar", undefined);
    assert.strictEqual(obj, { x: "y", twofoldly: { foo: {} } });
    assert.strictEqual(
      Object.prototype.hasOwnProperty.call(obj.twofoldly.foo, "bar"),
      false
    );
  });

  test("sets new array", () => {
    const obj = { x: "y" };
    dot.setter(obj, "foo.0", "bar");
    assert.strictEqual(obj, { x: "y", foo: ["bar"] });
  });

  test("updates nested array value", () => {
    const obj = { x: "y", foo: ["bar"] };
    dot.setter(obj, "foo.0", "bar");
    assert.strictEqual(obj, { x: "y", foo: ["bar"] });
  });

  test("adds new item to nested array", () => {
    const obj = { x: "y", foo: ["bar"] };
    dot.setter(obj, "foo.1", "bar2");
    assert.strictEqual(obj, { x: "y", foo: ["bar", "bar2"] });
  });

  test("sticks to object with int key when defined", () => {
    const obj = { x: "y", foo: { 0: "a" } };
    dot.setter(obj, "foo.0", "b");
    assert.strictEqual(obj, { x: "y", foo: { 0: "b" } });
  });

  // /* eslint-disable  jest/no-commented-out-tests */
  // We are currently don't support bracket path

  // it("supports bracket path", () => {
  //   const obj = { x: "y" };
  //   dot.setter(obj, "nested[0]", "value");
  //   expect(obj).toEqual({ x: "y", nested: ["value"] });
  // });

  test("supports path containing key of the object", () => {
    const obj = { x: "y" };
    dot.setter(obj, "a.x.c", "value");
    assert.strictEqual(obj, { x: "y", a: { x: { c: "value" } } });
  });

  test("can convert primitives to objects before setting", () => {
    const obj = { x: [{ y: true }] };
    dot.setter(obj, "x.0.y.z", true);
    assert.strictEqual(obj, { x: [{ y: { z: true } }] });
  });
});

describe("toDot", () => {
  test("can covert simple object to dot path object", () => {
    const obj = {
      foo: "hi",
      bar: "yo",
      fooBar: 123,
      test: {
        foo: "hi2",
        bar: "yo2",
      },
    };

    const dotObj = dot.toDot(obj);
    assert.strictEqual(dotObj, {
      foo: "hi",
      bar: "yo",
      fooBar: 123,
      "test.foo": "hi2",
      "test.bar": "yo2",
    });
  });

  test("can conver nested object to dot path object", () => {
    const obj = {
      nested: {
        foo: {
          bar: 123,
          nested: {
            foo: "bar",
          },
        },
        hello: "how are you",
        good: null,
      },
    };
    const dotObj = dot.toDot(obj);
    assert.strictEqual(dotObj, {
      "nested.foo.bar": 123,
      "nested.foo.nested.foo": "bar",
      "nested.hello": "how are you",
      "nested.good": null,
    });
  });
});
