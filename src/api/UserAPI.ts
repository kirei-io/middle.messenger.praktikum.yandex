import { HTTPTransport, HTTPTransportConfig } from "../core/HTTPTransport";
import { UserResponse } from "./AuthAPI.interface";
import { BaseAPI } from "./BaseAPI";
import {
  ChangePasswordRequest,
  FindUserRequest,
  UserUpdateRequest,
} from "./UserAPI.interface";

class User extends BaseAPI {
  private static readonly PATH = {
    profile: () => "/profile",
    awatar: () => "/profile/avatar",
    password: () => "/password",
    user: (id: string) => `/${id}`,
    search: () => "/search",
  } as const;

  changeProfile = (data: UserUpdateRequest): Promise<UserResponse> =>
    this.apiInstance.put(User.PATH.profile(), { data });

  changeAvatar = (data: FormData): Promise<UserResponse> =>
    this.apiInstance.put(User.PATH.awatar(), { data });

  changePassword = (data: ChangePasswordRequest): Promise<null> =>
    this.apiInstance.put(User.PATH.password(), { data });

  user = (id: string): Promise<UserResponse> =>
    this.apiInstance.get(User.PATH.user(id));

  search = (data: FindUserRequest): Promise<UserResponse[]> =>
    this.apiInstance.post(User.PATH.search(), { data });
}

const UserAPIHTTPinstanceConfig: HTTPTransportConfig = {
  endpoint: "/user",
};
const UserAPIHTTPinstance = new HTTPTransport(UserAPIHTTPinstanceConfig);

export const UserAPI = new User(UserAPIHTTPinstance);
