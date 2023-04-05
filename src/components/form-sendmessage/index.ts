import { Block } from "../../core/Block";
import { ButtonDefault } from "../button-default";
import { InputBlock } from "../input-block";
import template from "./template.hbs";
import { MessagesController } from "../../controllers/MessagesController";
import { withStore } from "../../hocs/WithStore";
import { isValid } from "../../core/validator";

type FormSendMessageProps = {
  events?: {
    submit: (e: Event) => void;
  };
  chatId: number | undefined;
};
export class FormSendMessageComponent extends Block<FormSendMessageProps> {
  protected init(): void {
    this.setProps({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const values = this.getValues();
          if (!isValid(this.input.props.name as string, values)) {
            this.input.validator.show();
            return;
          } else if (this.props.chatId) {
            MessagesController.sendMessage(this.props.chatId, this.getValues());
            this.input.value = "";
          }
        },
      },
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

export const FormSendMessage = withStore((state) => {
  return {
    chatId: state.selectedChat?.data,
  };
})(FormSendMessageComponent);
