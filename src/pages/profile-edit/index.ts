import { ROUTE_PATH } from "../..";
import { FormProfile } from "../../components/form-profile";
import { RouteLink } from "../../components/route-link";
import { Block } from "../../core/Block";
import { withStore } from "../../hocs/WithStore";
import { FormAvatar } from "../../components/form-avatar";

import template from "./template.hbs";
import { Avatar } from "../../components/avatar";
import { State } from "../../core/Store";

type ProfileEditPageProps = { user: State["user"] };

export class ProfileEdit extends Block<ProfileEditPageProps> {
  protected init(): void {
    const editProfileInputs = [
      {
        name: "email",
        label: "Email:",
        type: "email",
        placeholder: this.props.user?.data.email ?? "null",
      },
      {
        name: "login",
        label: "Login:",
        type: "text",
        placeholder: this.props.user?.data.login ?? "null",
      },
      {
        name: "first_name",
        label: "First name:",
        type: "text",
        placeholder: this.props.user?.data.first_name ?? "null",
      },
      {
        name: "second_name",
        label: "Second name:",
        type: "text",
        placeholder: this.props.user?.data.second_name ?? "null",
      },
      {
        name: "display_name",
        label: "Display name:",
        type: "text",
        placeholder: this.props.user?.data.display_name ?? "null",
      },
      {
        name: "phone",
        label: "Phone:",
        type: "tel",
        placeholder: this.props.user?.data.phone ?? "null",
      },
    ];

    this.children.form = new FormProfile({ inputsMeta: editProfileInputs });
    this.children.changeAvatar = new FormAvatar();
    this.avatar(this.props);
    this.children.back = new RouteLink({
      label: "Back",
      path: ROUTE_PATH.PROFILE,
    });
  }

  private avatar(props: ProfileEditPageProps) {
    this.children.avatar = new Avatar({
      image: props.user?.data.avatar,
      className: "profile-avatar",
    });
  }

  protected didUpdate(_: unknown, newProps: ProfileEditPageProps): boolean {
    this.avatar(newProps);
    this.setProps({ ...newProps });
    return true;
  }
  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}

export const ProfileEditPage = withStore((state) => {
  return { user: state.user };
})(ProfileEdit);
