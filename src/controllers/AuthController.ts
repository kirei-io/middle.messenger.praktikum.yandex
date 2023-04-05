import { AuthAPI } from "../api/AuthAPI";
import { SignInRequest, SignUpRequest } from "../api/AuthAPI.interface";
import { Router } from "../core/Router";
import { Store } from "../core/Store";
import { MessagesController } from "./MessagesController";

class Auth {
  private readonly api = AuthAPI;

  async signin(data: SignInRequest) {
    try {
      await this.api.signin(data);
      Router.instance().go("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async signup(data: SignUpRequest) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      Router.instance().go("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.read();
      Store.instance().set("user.data", user);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async logout() {
    try {
      MessagesController.closeAll();
      await this.api.logout();

      Router.instance().go("/");
    } catch (error) {
      console.log(error);
    }
  }
}

export const AuthController = new Auth();
