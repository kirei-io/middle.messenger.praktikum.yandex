import { Block } from "../../core/Block";
import template from "./template.hbs";

export class ButtonDefault extends Block {
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
