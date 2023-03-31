import { ButtonDefault } from "../button-default";
import { FormDefault } from "../form-default";
import { InputBlock } from "../input-block";

const loginInputs = [
  {
    name: "login",
    placeholder: "login",
    type: "text",
    className: "form__input",
  },
  {
    name: "password",
    placeholder: "password",
    type: "password",
    className: "form__input",
  },
];

export class FormLogin extends FormDefault {
  constructor() {
    super();
  }
  protected init(): void {
    super.init();

    this.children.inputs = loginInputs.map(
      (props) => new InputBlock({ ...props })
    );

    this.children.buttonSubmit = new ButtonDefault({
      type: "submit",
      className: "form__button",
      label: "Sign in",
    });
  }
}
