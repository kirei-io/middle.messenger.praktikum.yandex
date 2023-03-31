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
}
