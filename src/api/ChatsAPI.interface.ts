import { UserResponse } from "./AuthAPI.interface";

export type ChatResponse = {
  id: number;
  title: string;
  avatar: string;
  unread_count: string;
  last_message: {
    user: UserResponse;
    time: string;
    content: string;
  };
};

export type CreateChatRequest = {
  title: string;
};

export type DeleteChatRequest = {
  chatId: number;
};

export type ChatDeleteResponce = {
  userId: number;
  result: ChatResponse;
};

export type ChatUserResponse = ChatResponse & {
  role: "admin" | "regular";
};

export type UsersRequest = {
  users: number[];
  chatId: number;
};

export type ChatsMsssagesTokenResponse = {
  token: string;
};
