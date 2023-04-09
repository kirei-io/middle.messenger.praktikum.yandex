import { expect } from "chai";
import { Block } from "./Block";
import sinon from "sinon";

describe("Block class", () => {
  const render = sinon.stub();
  const didUpdate = sinon.stub();
  class TestComponent<
    T extends Record<string, unknown> = Record<string, unknown>
  > extends Block<T> {
    protected render(): DocumentFragment {
      const doc = new DocumentFragment();
      doc.appendChild(document.createElement("template"));
      render();
      return doc;
    }
    didUpdate(oldProps: unknown, newProps: unknown): boolean {
      didUpdate(oldProps, newProps);
      return true;
    }
  }
  
  it("render block", () => {
    new TestComponent();
    expect(render.calledOnce);
  });

  it("set props", () => {
    const component = new TestComponent();
    component.setProps({
      test: "prop",
    });

    expect(component.props.test).to.eq("prop");
  });

  it("update props", () => {
    const component = new TestComponent<{ test: string }>({ test: "prop" });
    component.setProps({ test: "hello world" });
    expect(didUpdate.calledOnce);
  });

  it("create with props and childs", () => {
    const child = new TestComponent();
    const component = new TestComponent<{
      test: string;
      child: Block;
    }>({
      test: "string",
      child: child,
    });

    expect(component.children);
    expect(component.props);
  });
});
