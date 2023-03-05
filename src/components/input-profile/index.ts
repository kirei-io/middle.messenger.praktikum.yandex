import { InputBlock } from "../input-block";
import template from "./template.hbs";

export class InputProfile extends InputBlock {
  protected init(): void {
    this.setProps({ inputClassName: "input-inner" });
    super.init();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
