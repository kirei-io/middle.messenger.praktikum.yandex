import { Block } from "../../core/Block";
import { formSubmitHandler } from "../../services/FormSubmitHandler";
import { ButtonDefault } from "../button-default";
import { InputBlock } from "../input-block";
import { InputProfile } from "../input-profile";
import template from "./template.hbs";

export class FormProfile extends Block {
  protected init(): void {
    this.setProps({
      events: {
        submit: (e: Event) => {
          formSubmitHandler(e, this.getValues(), this.inputs);
        },
      },
    });
    const inputsMeta = this.props.inputsMeta as Record<string, string>[];
    this.children.inputs = inputsMeta.map((props) => new InputProfile(props));
    this.children.buttonSubmit = new ButtonDefault({
      label: "save",
      className: "button-outline profile-edit__button",
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
