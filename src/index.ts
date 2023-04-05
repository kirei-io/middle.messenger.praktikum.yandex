import { AuthController } from "./controllers/AuthController";
import { Router } from "./core/Router";
import { ChatPage } from "./pages/chat";
import { LoginPage } from "./pages/login";
import { NotFoundPage } from "./pages/notfound";
import { ProfilePage } from "./pages/profile";
import { ProfileChangePasswordPage } from "./pages/profile-changepassword";
import { ProfileEditPage } from "./pages/profile-edit";
import { ServerErrorPage } from "./pages/servererror";
import { SignupPage } from "./pages/signup";

export enum ROUTE_PATH {
  LOGIN = "/",
  CHAT = "/chat",
  NOT_FOUND = "/notfound",
  PROFILE = "/profile",
  PROFILE_CHANGE_PASSWORD = "/profile/change-password",
  PROFILE_EDIT = "/profile/edit",
  SERVER_ERROR = "/servererror",
  SIGNUP = "/signup",
}

window.addEventListener("DOMContentLoaded", async () => {
  const router = Router.create("#app");

  router
    .use(ROUTE_PATH.LOGIN, LoginPage)
    .use(ROUTE_PATH.SIGNUP, SignupPage)
    .use(ROUTE_PATH.CHAT, ChatPage)
    .use(ROUTE_PATH.PROFILE, ProfilePage)
    .use(ROUTE_PATH.PROFILE_EDIT, ProfileEditPage)
    .use(ROUTE_PATH.PROFILE_CHANGE_PASSWORD, ProfileChangePasswordPage)
    .use(ROUTE_PATH.NOT_FOUND, NotFoundPage)
    .use(ROUTE_PATH.SERVER_ERROR, ServerErrorPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case ROUTE_PATH.LOGIN:
    case ROUTE_PATH.SIGNUP:
      isProtectedRoute = false;
      break;
  }
  if (
    Object.values(ROUTE_PATH).includes(window.location.pathname as ROUTE_PATH)
  ) {
    try {
      await AuthController.fetchUser();
      router.start();

      if (!isProtectedRoute) {
        router.go(ROUTE_PATH.PROFILE);
      }
    } catch (error) {
      if (window.location.pathname !== "/") {
        window.location.pathname = "/";
      }
      router.start();
      if (isProtectedRoute) {
        router.go(ROUTE_PATH.LOGIN);
      }
    }
  } else {
    Router.instance().start();
    Router.instance().go(ROUTE_PATH.NOT_FOUND);
  }
});
