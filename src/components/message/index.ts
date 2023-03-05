import { Block } from "../../core/Block";
import template from "./template.hbs";

export class Message extends Block {
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
