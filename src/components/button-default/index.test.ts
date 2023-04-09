import Sinon from "sinon";
import { ButtonDefault } from ".";
import { expect } from "chai";

describe("ButtonDefault class", () => {
  it("Soud render", () => {
    new ButtonDefault();
  });

  it("should passed on click", () => {
    const click = Sinon.stub();
    const button = new ButtonDefault({
      events: {
        click: () => {
          click();
        },
      },
      label: "test",
    });

    const element = button.htmlElement as HTMLButtonElement;
    element.click();

    expect(click.calledOnce).to.eq(true);
  });
});
