import { UserController } from "../../controllers/UserController";
import { Block } from "../../core/Block";
import template from "./template.hbs";

type MessageProps = {
  text: string;
  time: string;
  target: "from" | "to";
  userId?: string;
  login?: string;
};

export class Message extends Block<MessageProps> {
  protected async init() {
    if (this.props.userId) {
      const user = await UserController.getUserById(this.props.userId);
      this.setProps({
        login: user?.login,
        time: new Date(this.props.time).toLocaleString(),
      });
    }
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
