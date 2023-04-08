export type UserUpdateRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type FindUserRequest = {
  login: string;
};
