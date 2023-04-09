import { AuthController } from "./controllers/AuthController";
import { Router } from "./core/Router";
import { ChatPage } from "./pages/chat";
import { ProfilePage } from "./pages/profile";
import "./style/main.sass";

export enum ROUTE_PATH {
  LOGIN = "/",
  CHAT = "/chat",
  PROFILE = "/profile",
  NOT_FOUND = "/notfound",
  PROFILE_CHANGE_PASSWORD = "/profile/change-password",
  PROFILE_EDIT = "/profile/edit",
  SERVER_ERROR = "/servererror",
  SIGNUP = "/signup",
}

window.addEventListener("DOMContentLoaded", async () => {
  const router = Router.create("#app");

  router
    .use(ROUTE_PATH.CHAT, ChatPage)
    .use(ROUTE_PATH.PROFILE, ProfilePage)
    .use(
      ROUTE_PATH.PROFILE_EDIT,
      (
        await import(
          /* webpackChunkName: "profile-edit" */ "./pages/profile-edit"
        )
      ).ProfileEditPage
    )
    .use(
      ROUTE_PATH.PROFILE_CHANGE_PASSWORD,
      (
        await import(
          /* webpackChunkName: "password" */ "./pages/profile-changepassword"
        )
      ).ProfileChangePasswordPage
    )
    .use(
      ROUTE_PATH.LOGIN,
      (await import(/* webpackChunkName: "login" */ "./pages/login")).LoginPage
    )
    .use(
      ROUTE_PATH.SIGNUP,
      (await import(/* webpackChunkName: "signup" */ "./pages/signup"))
        .SignupPage
    )
    .use(
      ROUTE_PATH.NOT_FOUND,
      (await import(/* webpackChunkName: "notfound" */ "./pages/notfound"))
        .NotFoundPage
    )
    .use(
      ROUTE_PATH.SERVER_ERROR,
      (
        await import(
          /* webpackChunkName: "servererror" */ "./pages/servererror"
        )
      ).ServerErrorPage
    );

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
