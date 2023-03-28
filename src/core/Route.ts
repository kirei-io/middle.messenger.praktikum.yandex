import { Block } from "./Block";

export class Route {
  private readonly blockClass: new () => Block;
  private block: Block | null = null;

  /**
   * Create a new route
   * @param pathname - route path
   * @param block - `Сlass` extending abstract class `Block`
   * @param props - route options
   */
  constructor(
    private pathname: string,
    block: new () => Block,
    private readonly props: { rootQuery: string }
  ) {
    this.blockClass = block;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  public leave() {
    if (this.block) {
      this.block.hide();
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

    this.block.show();
  }
}
