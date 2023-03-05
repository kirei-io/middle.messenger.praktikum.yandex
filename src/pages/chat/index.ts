import { ButtonDefault } from "../../components/button-default";
import { DropdownChatSettings } from "../../components/dropdown-chatsettings";
import { FormSendMessage } from "../../components/form-sendmessage";
import { Message } from "../../components/message";
import { Block } from "../../core/Block";

import template from "./template.hbs";

const messages = [
  {
    target: "from",
    time: "10:11",
    text: "hello world!0",
  },
  {
    target: "from",
    time: "10:11",
    text: "hello world!1",
  },
  {
    target: "to",
    time: "10:11",
    text: "hello world!2",
  },
  {
    target: "to",
    time: "10:11",
    text: "hello world!3",
  },
];

export class ChatPage extends Block {
  protected init(): void {
    this.setProps({
      events: {
        click: (e: Event) => {
          const dropdown = this.children.dropdownChatSettings as Block;
          if (dropdown.props.display) {
            const elIncludeInPath = e
              .composedPath()
              .includes(dropdown.htmlElement);

            if (!elIncludeInPath) {
              dropdown.setProps({ display: false });
              dropdown.hide();
            }
          }
        },
      },
    });

    this.children.dropdownChatSettings = new DropdownChatSettings({
      display: false,
    });
    this.children.dropdownChatSettings.hide();

    this.children.buttonChatSettings = new ButtonDefault({
      label: "settings",
      className: "button-outline",
      events: {
        click: (e: Event) => {
          e.stopPropagation();
          if ((this.children.dropdownChatSettings as Block).props.display) {
            (this.children.dropdownChatSettings as Block).setProps({
              display: false,
            });
            (this.children.dropdownChatSettings as Block).hide();
          } else {
            (this.children.dropdownChatSettings as Block).setProps({
              display: true,
            });
            (this.children.dropdownChatSettings as Block).show();
          }
        },
      },
    });

    this.children.messages = messages.map((props) => new Message(props));
    this.children.form = new FormSendMessage();
    // this.children.inputMessage = new InputMessage();
    // this.children.buttonSubmit = new ButtonDefault({
    //   type: "submit",
    //   label: "Send",
    //   className: "button-outline",
    //   events: {
    //     click: (e: Event) => {
    //       e.preventDefault();
    //       const message = {
    //         value: (this.children.inputMessage as InputMessage).value,
    //       };

    //       console.log(message);
    //     },
    //   },
    // });
    // this.children.buttonMessageAdd = new ButtonDefault({
    //   label: "Add",
    //   className: "button-outline",
    //   events: {
    //     click: (e: Event) => {
    //       console.log("message add");
    //     },
    //   },
    // });
  }
  protected render(): DocumentFragment {
    return this.compile(template, {});
  }
}
