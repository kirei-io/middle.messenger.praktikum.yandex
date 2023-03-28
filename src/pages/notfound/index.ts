import { Block } from "../../core/Block";

import template from "./template.hbs";

export class NotFoundPage extends Block {
  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
