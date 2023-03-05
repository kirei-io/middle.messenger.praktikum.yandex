import { Block } from "../../core/Block";

import template from "./template.hbs";

export class ProfilePage extends Block {
  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
