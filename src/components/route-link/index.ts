import { Block } from "../../core/Block";
import { Router } from "../../core/Router";
import template from "./template.hbs";

type RouteLinkProps = {
  path: string;
  label: string;
  events?: { click: (e: Event) => void };
};

export class RouteLink extends Block<RouteLinkProps> {
  protected init(): void {
    this.setProps({
      events: {
        click: (e) => {
          e.preventDefault();
          Router.instance().go(this.props.path as string);
          console.log("ROUTE-LINK: go to " + this.props.path);
        },
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
