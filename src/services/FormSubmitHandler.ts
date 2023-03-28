import { InputBlock } from "../components/input-block";
import { isValid } from "../core/validator";

export function formSubmitHandler(
  e: Event,
  values: Record<string, string>,
  inputs: InputBlock[]
) {
  e.preventDefault();
  const notValidInputs = inputs.filter((input) => {
    const name = input.props.name as string;
    const valid = isValid(name, values[name]);
    if (!valid) {
      input.validator.show();
      return input;
    }
  });
  if (notValidInputs.length === 0) {
    console.log(values);
  } else {
    console.log("form validate error");
  }
}
