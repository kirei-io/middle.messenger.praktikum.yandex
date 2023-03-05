import { Block } from "../../core/Block";

import template from "./template.hbs";

export class ServerErrorPage extends Block {
  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
