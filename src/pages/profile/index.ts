import { ROUTE_PATH } from "../..";
import { Avatar } from "../../components/avatar";
import { ButtonDefault } from "../../components/button-default";
import { RouteLink } from "../../components/route-link";
import { AuthController } from "../../controllers/AuthController";
import { Block } from "../../core/Block";
import { Router } from "../../core/Router";
import { State } from "../../core/Store";
import { withStore } from "../../hocs/WithStore";

import template from "./template.hbs";

type ProfilePageProps = { user: State["user"] };

export class Profile extends Block<ProfilePageProps> {
  protected init(): void {
    this.children.signout = new ButtonDefault({
      label: "Signout",
      events: {
        click: () => {
          AuthController.logout();
          Router.instance().go(ROUTE_PATH.LOGIN);
        },
      },
    });

    this.children.back = new RouteLink({
      label: "Back",
      path: ROUTE_PATH.CHAT,
    });

    this.children.avatar = new Avatar({
      image: this.props.user?.data?.avatar,
      className: "profile-avatar",
    });

    this.children.editProfile = new RouteLink({
      label: "Edit profile",
      path: ROUTE_PATH.PROFILE_EDIT,
    });
    this.children.changePassword = new RouteLink({
      label: "Chage password",
      path: ROUTE_PATH.PROFILE_CHANGE_PASSWORD,
    });
  }

  didUpdate(_: ProfilePageProps, newProps: ProfilePageProps): boolean {
    this.setProps({ ...newProps });
    return true;
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const ProfilePage = withStore((state) => {
  return { user: state.user };
})(Profile);
