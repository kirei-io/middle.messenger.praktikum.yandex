import { Router } from "./core/Router";
import { ChatPage } from "./pages/chat";
import { LoginPage } from "./pages/login";
import { NotFoundPage } from "./pages/notfound";
import { ProfilePage } from "./pages/profile";
import { ProfileChangePasswordPage } from "./pages/profile-changepassword";
import { ProfileEditPage } from "./pages/profile-edit";
import { ServerErrorPage } from "./pages/servererror";
import { SignupPage } from "./pages/signup";
import { debugPagesNav } from "./partials/debug-pages-nav";

enum ROUTE_PATH {
  LOGIN = "/login",
  CHAT = "/chat",
  NOT_FOUND = "/notfound",
  PROFILE = "/profile",
  PROFILE_CHANGE_PASSWORD = "/profile/change-password",
  PROFILE_EDIT = "/profile/edit",
  SERVER_ERROR = "/servererror",
  SIGNUP = "/signup",
}

const debugNav = () => {
  const debugNav = document.querySelector("#debug-nav") as HTMLElement;
  debugNav.innerHTML = debugPagesNav({});
};

debugNav();

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

window.addEventListener("DOMContentLoaded", () => router.start());
