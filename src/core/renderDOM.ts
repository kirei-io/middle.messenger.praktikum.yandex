import { ChatPage } from "../pages/chat";
import { LoginPage } from "../pages/login";
import { NotFoundPage } from "../pages/notfound";
import { ProfilePage } from "../pages/profile";
import { ProfileChangePasswordPage } from "../pages/profile-changepassword";
import { ProfileEditPage } from "../pages/profile-edit";
import { ServerErrorPage } from "../pages/servererror";
import { SignupPage } from "../pages/signup";

const routes = {
  chat: ChatPage,
  login: LoginPage,
  notfound: NotFoundPage,
  profile: ProfilePage,
  profileChangePassword: ProfileChangePasswordPage,
  profileEdit: ProfileEditPage,
  servererror: ServerErrorPage,
  signup: SignupPage,
};

export function renderDOM(route: keyof typeof routes) {
  const root = document.querySelector("#app") as HTMLElement;
  root.innerHTML = "";

  const PageComponent = routes[route];
  const page = new PageComponent();

  root.appendChild(page.htmlElement);

  page.dispatchComponentDidMount();
}
