import { ROUTE_PATH } from "../..";
import {
  ChangePasswordRequest,
  UserUpdateRequest,
} from "../../api/UserAPI.interface";
import { UserController } from "../../controllers/UserController";
import { Router } from "../../core/Router";
import { ButtonDefault } from "../button-default";
import { FormDefault } from "../form-default";
import { InputProfile } from "../input-profile";

export class FormProfile extends FormDefault {
  protected init() {
    super.init();
    const inputsMeta = this.props.inputsMeta as Record<string, string>[];
    this.children.inputs = inputsMeta.map((props) => new InputProfile(props));
    this.children.buttonSubmit = new ButtonDefault({
      label: "save",
      className: "button-outline profile-edit__button",
    });
  }

  protected async submitForm(
    values: ChangePasswordRequest | UserUpdateRequest
  ) {
    if ("oldPassword" in values) {
      await UserController.changePassword({
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
      });
    } else {
      await UserController.changeProfile({
        email: values.email,
        login: values.login,
        phone: values.phone,
        display_name: values.display_name,
        first_name: values.first_name,
        second_name: values.second_name,
      });
    }
    Router.instance().go(ROUTE_PATH.PROFILE);
  }
}
