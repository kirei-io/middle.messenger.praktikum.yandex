import { ContactsList } from "../../components/contacts-list";
import { MessagesList } from "../../components/messages-list";
import { Block } from "../../core/Block";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import template from "./template.hbs";

export class ChatPage extends Block {
  protected async init() {
    this.children.contactsList = new ContactsList();
    this.children.messagesList = new MessagesList();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
