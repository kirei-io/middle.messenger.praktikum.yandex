import { ErrorResponse, UserResponse } from "../api/AuthAPI.interface";
import { ChatResponse } from "../api/ChatsAPI.interface";
import { Message } from "../controllers/MessagesController";

import { set } from "../utils/set";
import { EventBus } from "./EventBus";

export type State = {
  user?: {
    data: UserResponse;
    error: ErrorResponse;
    isLoading?: boolean;
  };
  chats?: {
    data: ChatResponse[];
    error: ErrorResponse;
    isLoadign?: boolean;
  };
  messages?: {
    data: Record<number, Message[]>;
  };
  selectedChat?: {
    data: number;
  };

  searchUsers?: {
    data: UserResponse[];
  };
};

type StoreEvents = {
  updated: (state: State) => void;
};

export class Store extends EventBus<StoreEvents> {
  private state: State = {};
  private static storeInstance: null | Store = null;

  public static create() {
    if (!Store.storeInstance) {
      Store.storeInstance = new Store();
    }
    return Store.storeInstance;
  }

  public static instance() {
    if (!Store.storeInstance) {
      throw new Error("store is not created");
    }

    return Store.storeInstance;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit("updated", this.state);
  }

  getState(): State {
    return this.state;
  }
}

Store.create();
