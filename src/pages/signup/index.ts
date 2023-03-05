import { FormSignup } from "../../components/form-signup";
import { Block } from "../../core/Block";

import template from "./template.hbs";
export class SignupPage extends Block {
  protected init(): void {
    this.children.form = new FormSignup();
  }
  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
