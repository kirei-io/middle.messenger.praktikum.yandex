import { ROUTE_PATH } from "../..";
import { FormSignup } from "../../components/form-signup";
import { RouteLink } from "../../components/route-link";
import { Block } from "../../core/Block";
import { withStore } from "../../hocs/WithStore";

import template from "./template.hbs";
export class Signup extends Block {
  protected init(): void {
    this.children.form = new FormSignup();

    this.children.link = new RouteLink({
      label: "login",
      path: ROUTE_PATH.LOGIN,
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}

export const SignupPage = withStore((state) => state)(Signup);
