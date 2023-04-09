import { ROUTE_PATH } from "../..";
import { ChatResponse } from "../../api/ChatsAPI.interface";
import { ChatController } from "../../controllers/ChatController";
import { Block } from "../../core/Block";
import { withStore } from "../../hocs/WithStore";
import { ButtonDefault } from "../button-default";
import { ChatContact } from "../chat-contact";
import { RouteLink } from "../route-link";
import template from "./template.hbs";

type ContactsListProps = {
  chats: ChatResponse[] | undefined;
  events?: {
    click: () => void;
  };
};

export class ContactsListComponent extends Block<ContactsListProps> {
  protected init(): void {
    this.children.profileLink = new RouteLink({
      label: "Profile",
      path: ROUTE_PATH.PROFILE,
    });

    ChatController.fetchChats();
    this.children.contactsList = this.createContacts(this.props) ?? [];
  }

  private createContacts(props: ContactsListProps) {
    return props.chats?.map((data) => {
      return new ChatContact({
        contact: data,
        buttonDelete: new ButtonDefault({
          label: "Delete",
          events: {
            click: (e) => {
              e.stopPropagation();
              e.preventDefault();
              ChatController.delete(data.id);
            },
          },
        }),
        events: {
          click: () => {
            ChatController.selectChat(data.id);
          },
        },
      });
    });
  }

  didUpdate(_: unknown, newProps: ContactsListProps): boolean {
    this.children.contactsList = this.createContacts(newProps) ?? [];
    return true;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const ContactsList = withStore((state) => {
  return {
    chats: state.chats?.data,
  };
})(ContactsListComponent);
