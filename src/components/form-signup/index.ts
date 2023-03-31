import { Block } from "../../core/Block";
import { ButtonDefault } from "../button-default";
import { FormDefault } from "../form-default";
import { InputBlock } from "../input-block";
import template from "./template.hbs";

const signupLeftInputs = [
  {
    name: "email",
    type: "email",
    placeholder: "email",
    className: "form__input",
  },
  {
    name: "first_name",
    placeholder: "first name",
    type: "text",
    className: "form__input",
  },
  {
    name: "password",
    placeholder: "password",
    type: "password",
    className: "form__input",
  },
  {
    name: "password_repeat",
    placeholder: "password (repeat)",
    type: "password",
    className: "form__input",
  },
];

const signupRightInputs = [
  {
    name: "login",
    placeholder: "login",
    type: "text",
    className: "form__input",
  },
  {
    name: "second_name",
    placeholder: "second name",
    type: "text",
    className: "form__input",
  },
  {
    name: "phone",
    placeholder: "phone",
    type: "tel",
    className: "form__input",
  },
];
export class FormSignup extends FormDefault {
  protected init() {
    super.init();
    this.children.elementsLeft = signupLeftInputs.map(
      (props) => new InputBlock({ ...props })
    );
    this.children.elementsRight = [
      ...signupRightInputs.map((props) => new InputBlock(props)),
      new ButtonDefault({
        type: "submit",
        className: "form__button",
        label: "Create account",
      }),
    ];
    this.children.buttonSubmit = new ButtonDefault({});
  }

  /**
   * @Override
   */
  protected render() {
    return this.compile(template, this.props);
  }

  /**
   * @Override
   */
  public getValues() {
    const inputs = this.inputs;
    const values: Record<string, string> = {};
    inputs.forEach((input) => {
      values[input.props.name as string] = input.value;
    });

    return values;
  }

  /**
   * @Override
   */
  protected get inputs() {
    const elementsLeft = this.children.elementsLeft as InputBlock[];
    const elementsRight = (this.children.elementsRight as Block[]).filter(
      (component) => component instanceof InputBlock
    ) as InputBlock[];
    return [...elementsLeft, ...elementsRight];
  }
}
