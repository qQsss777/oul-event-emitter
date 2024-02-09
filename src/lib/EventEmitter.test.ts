import EventEmitter from "./EventEmitter";

class MyClassTest extends EventEmitter {
  counter = 0;
}

test("on subscribe to event", () => {
  const mct = new MyClassTest();
  mct.on("hello", (value) => (mct.counter += value as number));
  mct.emit("hello", 3);
  expect(mct.counter).toBe(3);
});

test("multiple on subscribes to event", () => {
  const mct = new MyClassTest();
  mct.on("hello", (value) => (mct.counter += value as number));
  mct.on("hello", (value) => (mct.counter += value as number));
  mct.on("hello", (value) => (mct.counter += value as number));
  mct.emit("hello", 3);
  expect(mct.counter).toBe(9);
});

test("once subscribe to event", () => {
  const mct = new MyClassTest();
  mct.once("hello", (value) => (mct.counter += value as number));
  mct.emit("hello", 3);
  mct.emit("hello", 3);
  expect(mct.counter).toBe(3);
});

test("remove event listener", () => {
  const mct = new MyClassTest();
  const lst = mct.on("hello", (value) => (mct.counter += value as number));
  lst.remove();
  mct.emit("hello", 3);
  expect(mct.counter).toBe(0);
});

test("remove one event listener", () => {
  const mct = new MyClassTest();
  mct.on("hello", (value) => (mct.counter += value as number));
  mct.on("hello", (value) => (mct.counter += value as number));
  const lst = mct.on("hello", (value) => (mct.counter += value as number));
  lst.remove();
  mct.on("hello", (value) => (mct.counter += value as number));
  mct.on("hello", (value) => (mct.counter += value as number));
  mct.emit("hello", 3);
  expect(mct.counter).toBe(12);
});
