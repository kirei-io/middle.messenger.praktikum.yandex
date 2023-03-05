import { Block } from "../../core/Block";
import { formSubmitHandler } from "../../services/FormSubmitHandler";
import { ButtonDefault } from "../button-default";
import { InputBlock } from "../input-block";
import template from "./template.hbs";

export class FormSendMessage extends Block {
  protected init(): void {
    this.setProps({
      events: {
        submit: (e: Event) => {
          const value = {
            [this.input.props.name as string]: this.getValues(),
          };
          formSubmitHandler(e, value, [this.input]);
        },
      },
    });
    this.children.buttonAddMessage = new ButtonDefault({
      label: "Add",
      className: "button-outline",
    });
    this.children.inputMessage = new InputBlock({
      name: "message",
      placeholder: "Write...",
      type: "text",
      inputClassName: "input-inner chat__message-input",
    });
    this.children.buttonSendMessage = new ButtonDefault({
      label: "Send",
      type: "submit",
      className: "button-outline",
    });

    // this.children.inputMessage = new InputMessage();
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  private get input() {
    return this.children.inputMessage as InputBlock;
  }

  private getValues() {
    return this.input.value;
  }
}
