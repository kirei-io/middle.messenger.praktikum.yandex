import { renderDOM } from "./core/renderDOM";
import { debugPagesNav } from "./partials/debug-pages-nav";

const path = {
  chat: "#chat",
  login: "#login",
  notfound: "#notfound",
  profile: "#profile",
  profileChangePassword: "#profile-change-password",
  profileChangeAvatar: "#profile-change-avatar",
  profileEdit: "#profile-edit",
  serverError: "#servererror",
  signup: "#signup",
};

const debugNav = () => {
  const debugNav = document.querySelector("#debug-nav") as HTMLElement;
  debugNav.innerHTML = debugPagesNav({});
};

const router = () => {
  const hash = window.location.hash || path.login;

  switch (hash) {
    case path.chat:
      renderDOM("chat");
      break;
    case path.login:
      renderDOM("login");
      break;

    case path.notfound:
      renderDOM("notfound");
      break;

    case path.profile:
      renderDOM("profile");
      break;

    case path.profileChangePassword:
      renderDOM("profileChangePassword");
      break;

    case path.profileEdit:
      renderDOM("profileEdit");
      break;

    case path.serverError:
      renderDOM("servererror");
      break;

    case path.signup:
      renderDOM("signup");
      break;

    default:
      renderDOM("notfound");
      break;
  }
};

debugNav();

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
