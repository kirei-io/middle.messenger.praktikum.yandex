import { ROUTE_PATH } from "../..";
import { RouteLink } from "../../components/route-link";
import { Block } from "../../core/Block";

import template from "./template.hbs";

export class NotFoundPage extends Block {
  protected init(): void {
    this.children.back = new RouteLink({
      label: "Back to home",
      path: ROUTE_PATH.CHAT,
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
