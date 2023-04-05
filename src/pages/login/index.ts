import { ROUTE_PATH } from "../..";
import { FormLogin } from "../../components/form-login/index";
import { RouteLink } from "../../components/route-link";
import { Block } from "../../core/Block";
import { withStore } from "../../hocs/WithStore";

import template from "./template.hbs";
export class Login extends Block {
  protected init(): void {
    this.children.form = new FormLogin();
    this.children.link = new RouteLink({
      label: "Create a profile",
      path: ROUTE_PATH.SIGNUP,
    });
  }
  protected render() {
    return this.compile(template, {});
  }
}

export const LoginPage = withStore((state) => state)(Login);
