import { Block } from "../../core/Block";
import { ButtonDefault } from "../button-default";
import { FormDefault } from "../form-default";
import template from "./template.hbs";

type ModalProps = {
  buttonCancel: ButtonDefault;
  form: FormDefault;
  title: string;
};

class ModailComponent extends Block<ModalProps> {
  protected didMount(): void {
    this.hide();
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const ModalDefault = ModailComponent;
