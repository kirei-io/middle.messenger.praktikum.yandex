import { Block } from "../../core/Block";
import { formSubmitHandler } from "../../services/FormSubmitHandler";
import { InputBlock } from "../input-block";
import template from "./template.hbs";

export abstract class FormDefault extends Block {
  protected init(): void {
    this.setProps({
      events: {
        submit: (e: Event) => {
          formSubmitHandler(e, this.getValues(), this.inputs);
        },
      },
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

  protected get inputs() {
    return this.children.inputs as InputBlock[];
  }
}
