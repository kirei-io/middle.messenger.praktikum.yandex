import { FormProfile } from "../../components/form-profile";
import { Block } from "../../core/Block";

import template from "./template.hbs";

const editProfileInputs = [
  {
    name: "email",
    label: "Email:",
    type: "email",
    placeholder: "user@mail.com",
  },
  {
    name: "login",
    label: "Login:",
    type: "text",
    placeholder: "userName",
  },
  {
    name: "first_name",
    label: "First name:",
    type: "text",
    placeholder: "User",
  },
  {
    name: "second_name",
    label: "Second name:",
    type: "text",
    placeholder: "User",
  },
  {
    name: "display_name",
    label: "Display name:",
    type: "text",
    placeholder: "User Name",
  },
  {
    name: "phone",
    label: "Phone:",
    type: "tel",
    placeholder: "+78005553535",
  },
];

export class ProfileEditPage extends Block {
  protected init(): void {
    this.children.form = new FormProfile({ inputsMeta: editProfileInputs });
  }
  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
