import { Block } from "../../core/Block";
import { ButtonDefault } from "../button-default";
import template from "./template.hbs";

type DropDownProps = {
  addUser: ButtonDefault;
  delUser: ButtonDefault;
  display: boolean;
};
export class DropdownChatSettings extends Block<DropDownProps> {
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
