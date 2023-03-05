import { Block } from "../../core/Block";
import template from "./template.hbs";

export class ValidatorMessage extends Block {
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
