import { HTTPTransport, HTTPTransportConfig } from "../core/HTTPTransport";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  UserResponse,
} from "./AuthAPI.interface";
import { BaseAPI } from "./BaseAPI";

const AuthAPIHTTPinstanceConfig: HTTPTransportConfig = {
  endpoint: "/auth",
};
const AuthAPIHTTPinstance = new HTTPTransport(AuthAPIHTTPinstanceConfig);

class Auth extends BaseAPI {
  signin = (data: SignInRequest): Promise<SignInResponse> =>
    this.apiInstance.post("/signin", { data });

  signup = (data: SignUpRequest): Promise<SignUpResponse> =>
    this.apiInstance.post("/signup", { data });

  read = (): Promise<UserResponse> => this.apiInstance.get("/user");

  logout = (): Promise<void> => this.apiInstance.post("/logout");
}

export const AuthAPI = new Auth(AuthAPIHTTPinstance);
