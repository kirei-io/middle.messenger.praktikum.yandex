import { ErrorResponse } from "../api/AuthAPI.interface";
import { ChatsAPI } from "../api/ChatsAPI";
import { Store } from "../core/Store";
import { MessagesController } from "./MessagesController";

class Chats {
  private readonly api = ChatsAPI;

  async create(title: string) {
    await this.api.create({ title });

    this.fetchChats();
  }

  async fetchChats() {
    try {
      const chats = await this.api.read();

      chats.map(async (chat) => {
        const token = await this.getToken(chat.id);
        if (!token) {
          throw new Error("token undefined");
        }
        await MessagesController.connect(chat.id, token);
      });
      Store.instance().set("chats.error", undefined);
      Store.instance().set("chats.data", chats);
    } catch (error) {
      Store.instance().set("chats.error", (error as ErrorResponse).reason);
    }
  }

  async addUserToChat(id: number, userId: number) {
    try {
      await this.api.addUsers({ chatId: id, users: [userId] });
      Store.instance().set("chats.error", undefined);
    } catch (error) {
      Store.instance().set("chats.error", (error as ErrorResponse).reason);
    }
  }

  async deleteUserFromChat(id: number, userId: number) {
    try {
      await this.api.delUsers({ chatId: id, users: [userId] });
      Store.instance().set("chats.error", undefined);
    } catch (error) {
      Store.instance().set("chats.error", (error as ErrorResponse).reason);
    }
  }

  async delete(id: number) {
    try {
      await this.api.delete({ chatId: id });
      await this.fetchChats();
      Store.instance().set("chats.error", undefined);
    } catch (error) {
      Store.instance().set("chats.error", (error as ErrorResponse).reason);
    }
  }

  async getToken(id: number) {
    try {
      Store.instance().set("chats.error", undefined);
      return await this.api.getToken(id.toString());
    } catch (error) {
      Store.instance().set("chats.error", (error as ErrorResponse).reason);
    }
  }

  selectChat(id: number) {
    Store.instance().set("selectedChat.data", id);
  }
}

export const ChatController = new Chats();
