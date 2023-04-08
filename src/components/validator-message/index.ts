import { Block } from "../../core/Block";
import template from "./template.hbs";

type ValidatorMessageProps = {
  message?: string;
};
export class ValidatorMessage extends Block<ValidatorMessageProps> {
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
