import { HTTPTransport, HTTPTransportConfig } from "../core/HTTPTransport";
import { BaseAPI } from "./BaseAPI";
import {
  ChatDeleteResponce,
  ChatResponse,
  ChatsMsssagesTokenResponse,
  ChatUserResponse,
  CreateChatRequest,
  DeleteChatRequest,
  UsersRequest,
} from "./ChatsAPI.interface";

const ChatsAPIHTTPinstanceConfig: HTTPTransportConfig = {
  endpoint: "/chats",
};
const ChatsAPIHTTPinstance = new HTTPTransport(ChatsAPIHTTPinstanceConfig);

class Chats extends BaseAPI {
  private static readonly PATH = {
    chat: () => "/",
    users: () => "/users",
    chatUsers: (id: string) => `/${id}/users`,
    token: (id: string) => `/token/${id}`,
  };
  create = (data: CreateChatRequest): Promise<null> =>
    this.apiInstance.post(Chats.PATH.chat(), { data });

  delete = (data: DeleteChatRequest): Promise<ChatDeleteResponce> =>
    this.apiInstance.delete(Chats.PATH.chat(), { data });

  read = (): Promise<ChatResponse[]> => this.apiInstance.get(Chats.PATH.chat());

  getUsers = (id: string): Promise<ChatUserResponse> =>
    this.apiInstance.get(Chats.PATH.chatUsers(id));

  addUsers = (data: UsersRequest): Promise<unknown> =>
    this.apiInstance.put(Chats.PATH.users(), { data });

  delUsers = (data: UsersRequest): Promise<void> =>
    this.apiInstance.delete(Chats.PATH.users(), { data });

  getToken = async (id: string): Promise<string> => {
    const response = await this.apiInstance.post<ChatsMsssagesTokenResponse>(
      Chats.PATH.token(id)
    );
    return response.token;
  };
}

export const ChatsAPI = new Chats(ChatsAPIHTTPinstance);
