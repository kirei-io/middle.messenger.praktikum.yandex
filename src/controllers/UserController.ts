import { UserAPI } from "../api/UserAPI";
import {
  ChangePasswordRequest,
  FindUserRequest,
  UserUpdateRequest,
} from "../api/UserAPI.interface";
import { Store } from "../core/Store";
import isEqual from "../utils/isEqual";

class User {
  private readonly api = UserAPI;

  async changeProfile(data: UserUpdateRequest) {
    try {
      if (isEqual(Store.instance().getState().user?.data ?? {}, data)) {
        throw new Error("Can't change profile. Values is equeal");
      }
      const newUser = await this.api.changeProfile(data);

      Store.instance().set("user.data", newUser);
    } catch (error) {
      console.log(error);
    }
  }

  async changeAvatar(data: FormData) {
    try {
      const newUser = await this.api.changeAvatar(data);

      Store.instance().set("user.data", newUser);
    } catch (error) {
      console.log(error);
    }
  }

  async changePassword(data: ChangePasswordRequest) {
    try {
      await this.api.changePassword(data);
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.api.user(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async findUser(data: FindUserRequest) {
    try {
      const users = await this.api.search(data);
      if (users.length < 1) {
        Store.instance().set("searchUsers.data", undefined);
      }
      Store.instance().set("searchUsers.data", users);
    } catch (error) {
      console.log(error);
    }
  }
}

export const UserController = new User();
