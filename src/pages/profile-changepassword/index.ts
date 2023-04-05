import { ROUTE_PATH } from "../..";
import { Avatar } from "../../components/avatar";
import { FormProfile } from "../../components/form-profile";
import { RouteLink } from "../../components/route-link";
import { Block } from "../../core/Block";
import { State } from "../../core/Store";
import { withStore } from "../../hocs/WithStore";

import template from "./template.hbs";

type ProfileChangePasswordPageProps = { user: State["user"] };

export class ProfileChangePassword extends Block<ProfileChangePasswordPageProps> {
  protected init(): void {
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

    this.children.form = new FormProfile({ inputsMeta: changePasswordInputs });

    this.children.avatar = new Avatar({
      image: this.props.user?.data.avatar,
      className: "profile-avatar",
    });

    this.children.back = new RouteLink({
      label: "Back",
      path: ROUTE_PATH.PROFILE,
    });
  }
  protected didUpdate(
    _: unknown,
    newProps: ProfileChangePasswordPageProps
  ): boolean {
    this.setProps({ ...newProps });
    return true;
  }
  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}

export const ProfileChangePasswordPage = withStore((state) => {
  return { user: state.user };
})(ProfileChangePassword);
