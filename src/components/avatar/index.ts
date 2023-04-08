import { Block } from "../../core/Block";
import template from "./template.hbs";

type AvatarProps = {
  className?: string;
  image?: string;
};

export class Avatar extends Block<AvatarProps> {
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
