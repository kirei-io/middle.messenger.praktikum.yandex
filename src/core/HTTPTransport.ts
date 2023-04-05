enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

type HTTPTransportOptions = {
  data?: unknown;
  timeout?: number;
};

type HTTPTransportHandler = <T = unknown>(
  path: string,
  options?: HTTPTransportOptions
) => Promise<T>;

export type HTTPTransportConfig = {
  endpoint: string;
};

export class HTTPTransport {
  private endpoint: string;
  private baseURL = "https://ya-praktikum.tech/api/v2";
  constructor(config: HTTPTransportConfig) {
    this.endpoint = config.endpoint;
  }
  public get: HTTPTransportHandler = (path, options) =>
    this.request(this.url(path), { ...options, method: METHOD.GET });

  public post: HTTPTransportHandler = (path, options) =>
    this.request(this.url(path), { ...options, method: METHOD.POST });

  public put: HTTPTransportHandler = (path, options) =>
    this.request(this.url(path), { ...options, method: METHOD.PUT });

  public delete: HTTPTransportHandler = (path, options) =>
    this.request(this.url(path), { ...options, method: METHOD.DELETE });

  private url(path?: string) {
    return `${this.baseURL}${this.endpoint}${path ?? ""}`;
  }

  private request<T>(
    url: string,
    options: HTTPTransportOptions & { method: METHOD }
  ): Promise<T> {
    const { method, data, timeout } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.timeout = timeout ?? 1000;

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: "abort" });
      xhr.onerror = () => reject({ reason: "network error" });
      xhr.ontimeout = () => reject({ reason: "timeout" });

      // xhr.setRequestHeader("Content-Type", "application/json");

      xhr.withCredentials = true;
      xhr.responseType = "json";

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        if (data instanceof FormData) {
          xhr.send(data);
        } else {
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify(data));
        }
      }
    });
  }
}
