import AuthAPI from "../api/AuthAPI";
import { SignInRequest, SignUpRequest } from "../api/AuthAPI.interface";
import { Router } from "../core/Router";
import { Store } from "../core/Store";

class AuthController {
  private readonly api = AuthAPI;

  async signin(data: SignInRequest) {
    try {
      await this.api.signin(data);

      Router.instance().go("/profile");
    } catch (error: any) {
      console.log(error);
    }
  }

  async signup(data: SignUpRequest) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      Router.instance().go("/profile");
    } catch (error: any) {
      console.log(error);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.read();

      Store.instance().set("user", user);
    } catch (error: any) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await this.api.logout();

      Router.instance().go("/");
    } catch (error: any) {
      console.log(error);
    }
  }
}

export default new AuthController();
