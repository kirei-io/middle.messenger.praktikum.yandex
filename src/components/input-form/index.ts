import { Block } from "../../core/Block";
import template from "./template.hbs";

export class InputForm extends Block {
  get value() {
    return (this.htmlElement as HTMLInputElement).value;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
