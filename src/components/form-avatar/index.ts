import { ROUTE_PATH } from "../..";
import { UserController } from "../../controllers/UserController";
import { Block } from "../../core/Block";
import { Router } from "../../core/Router";
import { ButtonDefault } from "../button-default";
import template from "./template.hbs";

export class FormAvatar extends Block {
  protected init(): void {
    this.setProps({
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          const form = new FormData(this.htmlElement as HTMLFormElement);
          await UserController.changeAvatar(form);
          Router.instance().go(ROUTE_PATH.PROFILE);
        },
      },
    });
    this.children.button = new ButtonDefault({
      label: "Change",
      type: "submit",
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
