import { Route } from "./Route";
import { Block } from "./Block";

/**
 * Stores the URL and its corresponding page component
 */
export class Router {
  private static routerInstance: Router | null;

  private readonly rootQuery: string;

  private readonly routes: Route[] = [];
  private readonly history = window.history;
  private currentRoute: Route | null = null;

  /**
   * Use the static method `Route.instance`
   * to get an instance of the `Router` class
   */
  private constructor(rootQuery: string) {
    this.rootQuery = rootQuery;
  }

  /**
   * Get instance of the `Router` class or create a new instance and return it.
   */
  public static instance(rootQuery: string) {
    if (!Router.routerInstance) {
      Router.routerInstance = new Router(rootQuery);
    }

    return Router.routerInstance;
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  /**
   * Register a new route
   */
  public use(pathname: string, block: new () => Block) {
    const route = new Route(pathname, block, {
      rootQuery: this.rootQuery,
    });
    this.routes.push(route);
    return this;
  }

  /**
   * Starting the router and
   * registration of the handler to change the location pathname
   */
  public start() {
    window.onpopstate = (event) => {
      this.onRoute((event.currentTarget as any).location.pathname);
    };

    this.onRoute(window.location.pathname);
  }

  /**
   * Go to a new route by `pathname`
   */
  public go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this.onRoute(pathname);
  }

  /**
   * Go to history back
   */
  public back() {
    window.history.back();
  }

  /**
   * Go to history forward
   */
  public forward() {
    window.history.forward();
  }
}
