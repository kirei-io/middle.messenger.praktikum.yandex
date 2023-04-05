import { Block } from "../core/Block";
import { State, Store } from "../core/Store";
import isEqual from "../utils/isEqual";

export function withStore<P extends Record<string, unknown>>(
  mapStateToProps: (state: State) => P
) {
  return function wrap(Component: typeof Block<P>) {
    let previousState: P;
    return class WithStore extends Component {
      constructor(props?: P) {
        previousState = mapStateToProps(Store.instance().getState());

        super({ ...props, ...previousState });

        Store.instance().on("updated", () => {
          const stateProps = mapStateToProps(Store.instance().getState());

          if (isEqual(previousState, stateProps)) {
            return;
          }

          previousState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    };
  };
}
