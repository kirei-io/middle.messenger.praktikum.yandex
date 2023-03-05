import { EventBus } from "./EventBus";

enum BLOCK_EVENTS {
  INIT = "init",
  CD_MOUNT = "component-did-mount",
  CD_UPDATE = "component-did-update",
  RENDER = "render",
}

type BlockEventHandler = () => void;
type BlockEventCDUpdateHander = (oldProps: unknown, newProps: unknown) => void;

type BlockEventsType = {
  [BLOCK_EVENTS.INIT]: BlockEventHandler;
  [BLOCK_EVENTS.CD_MOUNT]: BlockEventHandler;
  [BLOCK_EVENTS.CD_UPDATE]: BlockEventCDUpdateHander;
  [BLOCK_EVENTS.RENDER]: BlockEventHandler;
};

type Props = Record<string, unknown>;
type Child = Record<string, Block | Block[]>;

export class Block {
  private element: HTMLElement | null = null;
  protected id = window.crypto.randomUUID();
  public readonly props: Props;
  public readonly children: Child;
  private eventBus: () => EventBus<BlockEventsType>;

  constructor(propsWithChildren: Props | Child = {}) {
    const eventBus = new EventBus<BlockEventsType>();

    const { props, children } = this.getChildrenAndProps(propsWithChildren);
    this.children = children;
    this.props = this.makePropsProxy(props);

    this.eventBus = () => eventBus;
    this.registerEvents(eventBus);
    eventBus.emit(BLOCK_EVENTS.INIT);
  }

  get htmlElement() {
    if (!this.element) {
      throw new Error("Element didnt created");
    }
    return this.element;
  }

  public setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private getChildrenAndProps(propsWithChildren: Props | Child) {
    const props: Props = {};
    const children: Child = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every((el) => el instanceof Block)) {
        children[key] = value;
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { props, children };
  }

  /**
   * Register all handlers in the bus for block events
   */
  private registerEvents(eventBus: EventBus<BlockEventsType>) {
    eventBus.on(BLOCK_EVENTS.INIT, this.componentInit.bind(this));
    eventBus.on(BLOCK_EVENTS.CD_UPDATE, this.componentDidUpdate.bind(this));
    eventBus.on(BLOCK_EVENTS.CD_MOUNT, this.componentDidMount.bind(this));
    eventBus.on(BLOCK_EVENTS.RENDER, this.componentRender.bind(this));
  }

  /**
   * Convert `HandlebarsTemplateDelegate` to `DocumentFragment`
   */
  protected compile(
    template: HandlebarsTemplateDelegate,
    context: Record<string, unknown>
  ) {
    const contextAndStubs = { ...context };
    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map(
          (child) => `<div data-id="${child.id}"></div>`
        );
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);
    const temp = document.createElement("template");
    temp.innerHTML = html;

    // eslint-disable-next-line
    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach((child) => {
          const stub = temp.content.querySelector(`[data-id="${child.id}"]`);

          if (!stub) {
            return;
          }

          child.htmlElement.append(...Array.from(stub.childNodes));

          stub.replaceWith(child.htmlElement);
        });
      } else {
        const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

        if (!stub) {
          return;
        }

        component.htmlElement.append(...Array.from(stub.childNodes));

        stub.replaceWith(component.htmlElement);
      }
    });

    return temp.content;
  }

  private forEachEvents(
    callback: (eventName: string, event: () => void) => void
  ) {
    const { events = {} } = this.props as {
      events: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      callback(eventName, events[eventName]);
    });
  }

  /**
   * Add event listeners on element
   */
  private addEvents() {
    this.forEachEvents((eventName, event) => {
      this.element?.addEventListener(eventName, event);
    });
  }

  /**
   * Removing event listeners before re-rendering to avoid memory leaks
   */
  private removeEvents() {
    this.forEachEvents((eventName, event) => {
      this.element?.removeEventListener(eventName, event);
    });
  }

  /**
   * Creating a proxy wrapper for a prop object
   */
  private makePropsProxy(props: Props) {
    return new Proxy(props, {
      set: (target, key, value) => {
        const oldValue = target[String(key)];
        target[String(key)] = value;

        this.eventBus().emit(BLOCK_EVENTS.CD_UPDATE, oldValue, value);

        return true;
      },

      deleteProperty: () => {
        throw new Error("No access to delete the prop");
      },
    });
  }

  /**
   * Initializing the component. Called once when creating a component.
   */
  private componentInit() {
    this.init();
    // console.log("init");
    this.eventBus().emit(BLOCK_EVENTS.RENDER);
  }

  protected init(): void {
    return;
  }

  private componentRender() {
    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;

    this.removeEvents();

    if (this.element) {
      this.element.replaceWith(newElement);
    }

    this.element = newElement;

    this.addEvents();
  }

  protected render() {
    return new DocumentFragment();
  }

  private componentDidUpdate: BlockEventCDUpdateHander = (
    oldProps,
    newProps
  ) => {
    // console.log("did update");
    const response = this.didUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(BLOCK_EVENTS.RENDER);
    }
  };

  private componentDidMount() {
    // console.log("did mount");
    this.didMount();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected didMount(oldProps?: Props) {
    return;
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(BLOCK_EVENTS.CD_MOUNT);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected didUpdate(oldProps: unknown, newProps: unknown): boolean {
    return true;
  }

  /**
   * Set style property "display" as block
   */
  public show() {
    this.htmlElement.style.display = "block";
  }

  /**
   * Set style property "display" as none
   */
  public hide() {
    this.htmlElement.style.display = "none";
  }
}
