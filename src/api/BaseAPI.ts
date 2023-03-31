import { HTTPTransport } from "../core/HTTPTransport";

export class BaseAPI {
  constructor(protected readonly apiInstance: HTTPTransport) {}

  protected create(): Promise<unknown> {
    throw new Error("Not implemented");
  }

  protected request(): Promise<unknown> {
    throw new Error("Not implemented");
  }

  protected update(): Promise<unknown> {
    throw new Error("Not implemented");
  }

  protected delete(): Promise<unknown> {
    throw new Error("Not implemented");
  }
}
