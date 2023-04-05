import { Block } from "./Block";

export class Route {
  private readonly blockClass: new () => Block;
  private block: Block | null = null;
  private pathname: string;
  private readonly props: { rootQuery: string };

  /**
   * Create a new route
   * @param pathname - route path
   * @param block - `Сlass` extending abstract class `Block`
   * @param props - route options
   */
  constructor(options: {
    pathname: string;
    props: { rootQuery: string };
    block: new () => Block;
  }) {
    this.blockClass = options.block;
    this.pathname = options.pathname;
    this.props = options.props;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  public leave() {
    if (this.block) {
      this.block = null;
    }
  }

  public match(pathname: string) {
    return pathname === this.pathname;
  }

  /**
   * Add page to DOM
   */
  public render() {
    if (!this.block) {
      this.block = new this.blockClass();

      const root = document.querySelector(this.props.rootQuery);

      if (!root) {
        throw new Error("Error: Root DOM Node not found");
      }
      root.innerHTML = "";
      root.appendChild(this.block.htmlElement);
      this.block.dispatchComponentDidMount();
    }
  }
}
