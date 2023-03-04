import { chatPage } from "./pages/chat";
import { loginPage } from "./pages/login";
import { notfoundPage } from "./pages/notfound";
import { profilePage } from "./pages/profile";
import { profileChangeAvatarPage } from "./pages/profile-changeavatar";
import { profileChangePasswordPage } from "./pages/profile-changepassword";
import { profileEditPage } from "./pages/profile-edit";
import { serverErrorPage } from "./pages/servererror";
import { signupPage } from "./pages/signup";
import { dropDownDefault } from "./partials/dropdown-default";
import { message } from "./partials/message";
import { modalDefault } from "./partials/modal-default";

const routes = {
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

const root = document.querySelector("#app") as HTMLElement;

const router = () => {
  const hash = window.location.hash || "#";
  console.log(hash);
  switch (hash) {
    case routes.chat:
      root.innerHTML = chatPage(
        {},
        {
          partials: {
            message: message,
            "dropdown-default": dropDownDefault,
          },
        }
      );
      break;

    case routes.login:
      root.innerHTML = loginPage({});
      break;

    case routes.notfound:
      root.innerHTML = notfoundPage({});
      break;

    case routes.profile:
      root.innerHTML = profilePage({});
      break;

    case routes.profileChangeAvatar:
      root.innerHTML = profileChangeAvatarPage(
        {},
        { partials: { "modal-default": modalDefault } }
      );
      break;

    case routes.profileChangePassword:
      root.innerHTML = profileChangePasswordPage({});
      break;

    case routes.profileEdit:
      root.innerHTML = profileEditPage({});
      break;

    case routes.serverError:
      root.innerHTML = serverErrorPage({});
      break;

    case routes.signup:
      root.innerHTML = signupPage({});
      break;

    default:
      root.innerHTML = notfoundPage({});
      break;
  }
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
