import { ChatResponse } from "../../api/ChatsAPI.interface";
import { Block } from "../../core/Block";
import { ButtonDefault } from "../button-default";
import template from "./template.hbs";

type ChatContactProps = {
  contact: ChatResponse;
  buttonDelete: ButtonDefault;
  events?: {
    click: () => void;
  };
};

export class ChatContact extends Block<ChatContactProps> {
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
