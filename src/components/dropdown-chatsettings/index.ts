import { Block } from "../../core/Block";
import { ButtonDefault } from "../button-default";
import template from "./template.hbs";

export class DropdownChatSettings extends Block {
  protected init(): void {
    this.children.buttonAddUser = new ButtonDefault({
      label: "Add User",
    });
    this.children.buttonDeleteUser = new ButtonDefault({
      label: "Delete User",
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
