import { expect } from "chai";
import { trim } from "./trim";

describe("trim funciton", () => {
  it("should default trim", () => {
    const value = "qqq";
    const result = trim(`    ${value}    `);
    expect(result).to.eq(value);
  });

  it("shoud be trim with pattern", () => {
    const value = "qqq";
    const pattern = "_-";
    const result = trim(`-_-${value}-`, pattern);
    expect(result).to.eq(value);
  });
});
