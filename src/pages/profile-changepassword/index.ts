import { FormProfile } from "../../components/form-profile";
import { Block } from "../../core/Block";

import template from "./template.hbs";

const changePasswordInputs = [
  {
    name: "oldPassword",
    label: "Old password:",
    type: "password",
    placeholder: "old password",
  },
  {
    name: "newPassword",
    label: "New password:",
    type: "password",
    placeholder: "new password",
  },
  {
    name: "newPassword_repeat",
    label: "New (repeat):",
    type: "password",
    placeholder: "new password (repeat)",
  },
];

export class ProfileChangePasswordPage extends Block {
  protected init(): void {
    this.children.form = new FormProfile({ inputsMeta: changePasswordInputs });
  }
  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
