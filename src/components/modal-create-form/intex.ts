import { ChatController } from "../../controllers/ChatController";
import { UserController } from "../../controllers/UserController";
import { Store } from "../../core/Store";
import { FormDefault } from "../form-default";

export class ModalCreateForm extends FormDefault {
  protected async submitForm(values: Record<string, string>): Promise<void> {
    if (values.title) {
      ChatController.create(values.title);
    } else if (values.addUser) {
      const selectedChat = Store.instance().getState().selectedChat?.data;
      if (selectedChat) {
        ChatController.addUserToChat(selectedChat, parseInt(values.addUser));
      }
    } else if (values.delUser) {
      const selectedChat = Store.instance().getState().selectedChat?.data;
      if (selectedChat) {
        ChatController.deleteUserFromChat(
          selectedChat,
          parseInt(values.delUser)
        );
      }
    } else if (values.search) {
      await UserController.findUser({ login: values.search });
    }
  }
}
