const regEx = {
  first_name: /(?:^[A-ZА-Я][a-zA-Zа-яА-Я-]*$)/,
  second_name: /(?:^[A-ZА-Я][a-zA-Zа-яА-Я-]*$)/,
  login: /(?:^[a-zA-Z][\w]{3,20}$)/,
  email: /(?:[\w-]+[@][\w-]+[.][\w-]+)/,
  password: /(?:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$)/,
  password_repeat: /(?:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$)/,
  phone: /(?:^[+\d]\d{10,15}$)/,

  display_name: /(?:^[a-zA-Zа-яА-Я]+$)/,

  message: /(?:.+)/,

  oldPassword: /(?:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$)/,
  newPassword: /(?:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$)/,
  newPassword_repeat: /(?:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$)/,
};

const message: Record<keyof typeof regEx, string> = {
  first_name:
    "Latin or cyrilic (can contain a dash )" +
    ", first letter shoud be uppercase, without spaces and numbers",
  second_name:
    "Latin or cyrilic (can contain a dash )" +
    ", first letter shoud be uppercase, without spaces and numbers",
  login: "From 3 to 20 latin symbols",
  email: "Latin symbols and contain a at (@)",
  password:
    "From 8 to 40 latin symbols" +
    " and shoud be contain one uppercase letter and number",
  password_repeat:
    "From 8 to 40 latin symbols" +
    " and shoud be contain one uppercase letter and number",
  phone: "From 10 to 15 numeric symbols can start with a plus (+)",

  display_name: "Latin or cyrilic symbols (can contain a dash )",
  message: "shouldn't be empty",

  oldPassword:
    "From 8 to 40 latin symbols" +
    " and shoud be contain one uppercase letter and number",
  newPassword:
    "From 8 to 40 latin symbols" +
    " and shoud be contain one uppercase letter and number",
  newPassword_repeat:
    "From 8 to 40 latin symbols" +
    " and shoud be contain one uppercase letter and number",
};

export const isValid = (name: string, str: string): boolean => {
  if (name in regEx) {
    return regEx[name as keyof typeof regEx].test(str);
  } else {
    throw new Error(name + " is not found");
  }
};

export const getValidatorMessage = (name: string): string => {
  if (name in regEx) {
    return message[name as keyof typeof regEx];
  } else {
    throw new Error(name + " is not found");
  }
};
