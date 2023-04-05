import { UserResponse } from "../../api/AuthAPI.interface";
import { Block } from "../../core/Block";
import { Store } from "../../core/Store";
import { withStore } from "../../hocs/WithStore";
import { ButtonDefault } from "../button-default";
import { FormDefault } from "../form-default";
import template from "./template.hbs";

type ModalProps = {
  buttonCancel?: ButtonDefault;
  form?: FormDefault;
  title?: string;
  searchResult: UserResponse[] | undefined;
};

class ModailComponent extends Block<ModalProps> {
  protected init(): void {
    this.children.buttonReset = new ButtonDefault({
      label: "Reset",
      events: {
        click: () => {
          Store.instance().set("searchUsers.data", undefined);
          this.setProps({ searchResult: undefined });
        },
      },
    });
  }

  protected didMount(): void {
    this.hide();
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const ModalSearch = withStore((state) => {
  return {
    searchResult: state.searchUsers?.data,
  } as ModalProps;
})(ModailComponent);
