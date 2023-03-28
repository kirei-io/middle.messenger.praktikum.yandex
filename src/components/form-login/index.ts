import { Block } from "../../core/Block";
import { formSubmitHandler } from "../../services/FormSubmitHandler";
import { ButtonDefault } from "../button-default";
import { InputBlock } from "../input-block";
import template from "./template.hbs";

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

export class FormLogin extends Block {
  protected init(): void {
    this.setProps({
      events: {
        submit: (e: Event) => {
          formSubmitHandler(e, this.getValues(), this.inputs);
        },
      },
    });
    this.children.inputs = loginInputs.map(
      (props) => new InputBlock({ ...props })
    );
    this.children.buttonSubmit = new ButtonDefault({
      type: "submit",
      className: "form__button",
      label: "Sign in",
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  public getValues() {
    const inputs = this.children.inputs as InputBlock[];
    const values: Record<string, string> = {};
    inputs.forEach((input) => {
      values[input.props.name as string] = input.value;
    });

    return values;
  }

  private get inputs() {
    return this.children.inputs as InputBlock[];
  }
}
