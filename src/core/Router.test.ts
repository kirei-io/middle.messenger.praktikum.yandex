import { Router } from "./Router";
import { expect } from "chai";
import sinon from "sinon";
import { Block } from "./Block";

describe("Router", () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === "function") {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === "function") {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  const getContentFake = sinon.stub();

  const BlockMock = class {
    get htmlElement() {
      getContentFake();
      return document.createElement("div");
    }
    dispatchComponentDidMount() {
      return;
    }
  } as unknown as new (props?: any) => Block;

  Router.create("#app");

  it("use() should return Router instance", () => {
    const result = Router.instance().use("/", BlockMock);

    expect(result).to.eq(Router.instance());
  });

  beforeEach(() => {
    getContentFake.reset();
  });

  it("should render a page on history back action", () => {
    Router.instance().use("/", BlockMock).start();

    Router.instance().back();
    /**
     * `getContentFake.callCount` tow times becouse first time - on `.start()`
     * and second time - on `.back()`
     */
    expect(getContentFake.callCount).to.eq(2);
  });

  beforeEach(() => {
    getContentFake.reset();
  });

  it("should render a page on history forward action", () => {
    Router.instance().use("/", BlockMock).start();

    Router.instance().forward();
    /**
     * `getContentFake.callCount` tow times becouse first time - on `.start()`
     * and second time - on `.forward()`
     */
    expect(getContentFake.callCount).to.eq(2);
  });

  beforeEach(() => {
    getContentFake.reset();
  });

  it("should render a page on start", () => {
    Router.instance().use("/", BlockMock).start();

    expect(getContentFake.callCount).to.eq(1);
  });
});
