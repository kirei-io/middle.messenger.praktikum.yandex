import { Block } from "../../core/Block";
import { isValid } from "../../core/validator";
import { InputBlock } from "../input-block";
import template from "./template.hbs";
export abstract class FormDefault extends Block {
  protected init(): void {
    this.setProps({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const values = this.getValues();
          const notValidInputs = this.inputs.filter((input) => {
            const name = input.props.name as string;
            const valid = isValid(name, values[name]);
            if (!valid) {
              input.validator.show();
              return input;
            }
          });
          if (notValidInputs.length < 1) {
            this.submitForm(values);
          }
        },
      },
    });
  }

  protected abstract submitForm(values: Record<string, string>): void;
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

  protected get inputs() {
    return this.children.inputs as InputBlock[];
  }
}
