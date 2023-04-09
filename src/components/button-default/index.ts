import { Block } from "../../core/Block";

import template from `./template.hbs`;

type ButtonDefaultProps = {
  label: string;

  type?: string;
  className?: string;
  events?: {
    click: (e: Event) => void;
  };
};

export class ButtonDefault extends Block<ButtonDefaultProps> {
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
