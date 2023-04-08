import { Block } from "../../core/Block";
import { getValidatorMessage, isValid } from "../../core/validator";
import { InputForm } from "../input-form";
import { ValidatorMessage } from "../validator-message";
import template from "./template.hbs";

export class InputBlock extends Block {
  get value() {
    return ((this.children.inputForm as Block).htmlElement as HTMLInputElement)
      .value;
  }

  set value(value: string) {
    ((this.children.inputForm as Block).htmlElement as HTMLInputElement).value =
      value;
  }

  protected init(): void {
    this.children.inputForm = new InputForm({
      name: this.props.name,
      type: this.props.type,
      placeholder: this.props.placeholder,
      className: this.props.inputClassName,
      events: {
        blur: () => {
          const valid = isValid(this.props.name as string, this.value);
          if (!valid) {
            this.validator.show();
          }
        },
        focus: () => {
          this.validator.hide();
        },
      },
    });
    this.children.validatorMessage = new ValidatorMessage({
      message: getValidatorMessage(this.props.name as string),
    });
    this.validator.hide();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  public get validator() {
    return this.children.validatorMessage as Block;
  }
}
