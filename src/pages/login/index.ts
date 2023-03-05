import { FormLogin } from "../../components/form-login";
import { Block } from "../../core/Block";

import template from "./template.hbs";
export class LoginPage extends Block {
  protected init(): void {
    this.children.form = new FormLogin();
  }
  protected render() {
    return this.compile(template, {});
  }
}
