import { Block } from "../../core/Block";
import { withStore } from "../../hocs/WithStore";
import { ButtonDefault } from "../button-default";
import { DropdownChatSettings } from "../dropdown-chatsettings";
import { FormSendMessage } from "../form-sendmessage";
import { Message } from "../message";
import template from "./template.hbs";
import { Message as MessageInfo } from "../../controllers/MessagesController";
import { InputForm } from "../input-form";
import { FormDefault } from "../form-default";
import { ModalDefault } from "../modal-default";
import { ModalSearch } from "../modal-search";
import { ModalCreateForm } from "../modal-create-form/intex";

type MessagesListProps = {
  selectedChat: number | undefined;
  messages: MessageInfo[] | undefined;
  chatTitle: string | undefined;
  userId: number | undefined;
  events?: {
    click: (e: Event) => void;
  };
};
class MessagesListComponent extends Block<MessagesListProps> {
  protected init(): void {
    this.dropdownInit();
    this.modalInit();
    this.children.messagesList = this.createMessages(this.props);

    this.children.form = new FormSendMessage();
    this.children.buttonCreateChat = new ButtonDefault({
      label: "Create new chat",
      events: {
        click: (e) => {
          e.preventDefault();
          (this.children.createModal as Block).show();
        },
      },
    });
    this.children.buttonSearchUser = new ButtonDefault({
      label: "Find user",
      events: {
        click: (e) => {
          e.preventDefault();
          (this.children.searchUserModal as Block).show();
        },
      },
    });
  }

  didUpdate(_: unknown, newProps: MessagesListProps): boolean {
    this.children.messagesList = this.createMessages(newProps);
    return true;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  private createMessages(props: MessagesListProps): Message[] {
    if (props.messages) {
      return props.messages
        .filter((value) => value.content)
        .map((data) => {
          return new Message({
            text: data.content,
            time: data.time,
            userId: String(data.user_id),
            target: data.user_id === props.userId ? "to" : "from",
          });
        });
    }
    return [];
  }

  // eslint-disable-next-line max-params
  private createModal(
    hide: () => void,
    title: string,
    inputName: string,
    Form: new (...args: any[]) => FormDefault
  ) {
    return new ModalDefault({
      title: title,
      form: new Form({
        inputs: [new InputForm({ name: inputName })],
        buttonSubmit: new ButtonDefault({
          label: "Enter",
          events: {
            click: () => {
              hide();
            },
          },
        }),
      }),
      buttonCancel: new ButtonDefault({
        label: "Cancel",
        events: {
          click: (e) => {
            e.preventDefault();
            hide();
          },
        },
      }),
    });
  }

  private modalInit() {
    this.children.createModal = this.createModal(
      () => (this.children.createModal as Block).hide(),
      "Create a new chat",
      "title",
      ModalCreateForm
    );

    this.children.addUserModal = this.createModal(
      () => (this.children.addUserModal as Block).hide(),
      "Add a new user to chat by user_id",
      "addUser",
      ModalCreateForm
    );

    this.children.delUserModal = this.createModal(
      () => (this.children.delUserModal as Block).hide(),
      "Delete user form chat by user_id",
      "delUser",
      ModalCreateForm
    );

    this.children.searchUserModal = new ModalSearch({
      title: "Search user by login",
      searchResult: undefined,
      form: new ModalCreateForm({
        inputs: [new InputForm({ name: "search", type: "text" })],
        buttonSubmit: new ButtonDefault({ type: "submit", label: "Search" }),
      }),
      buttonCancel: new ButtonDefault({
        label: "Cancel",
        events: {
          click: (e) => {
            e.preventDefault();
            (this.children.searchUserModal as Block).hide();
          },
        },
      }),
    });
  }

  private dropdownInit() {
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

    this.children.dropdownChatSettings = new DropdownChatSettings({
      display: true,
      addUser: new ButtonDefault({
        label: "Add User",
        events: {
          click: () => {
            (this.children.addUserModal as Block).show();
          },
        },
      }),
      delUser: new ButtonDefault({
        label: "Del User",
        events: {
          click: () => {
            (this.children.delUserModal as Block).show();
          },
        },
      }),
    });
    this.children.dropdownChatSettings.hide();
  }
}

export const MessagesList = withStore((state) => {
  const selectedChatId = state.selectedChat?.data;

  if (!selectedChatId) {
    return {
      messages: undefined,
      selectedChat: undefined,
      userId: state.user?.data.id,
      chatTitle: "Select a chat",
    };
  }

  return {
    messages: (state.messages?.data ?? {})[selectedChatId] ?? undefined,
    selectedChat: state.selectedChat?.data,
    userId: state.user?.data.id,
  } as MessagesListProps;
})(MessagesListComponent);
