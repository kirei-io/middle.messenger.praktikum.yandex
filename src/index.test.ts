import { expect } from "chai";
function hello(message: string) {
  return "hello " + message;
}

describe("Typescript + Babel usage suite", () => {
  it("should return string correctly", () => {
    expect(hello("mocha"), "Hello mocha");
  });
});
