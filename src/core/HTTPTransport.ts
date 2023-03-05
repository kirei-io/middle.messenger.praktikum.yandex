enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

type HTTPTransportOptions = {
  data?: Record<string, unknown>;
  timeout?: number;
};

type HTTPTransportHandler = (
  url: string,
  options?: HTTPTransportOptions
) => Promise<unknown>;

export class HTTPTransport {
  public get: HTTPTransportHandler = (url, options) =>
    this.request(
      url,
      { ...options, method: METHOD.GET },
      options?.timeout ?? 1000
    );

  public post: HTTPTransportHandler = (url, options) =>
    this.request(
      url,
      { ...options, method: METHOD.POST },
      options?.timeout ?? 1000
    );

  public put: HTTPTransportHandler = (url, options) =>
    this.request(
      url,
      { ...options, method: METHOD.PUT },
      options?.timeout ?? 1000
    );

  public delete: HTTPTransportHandler = (url, options) =>
    this.request(
      url,
      { ...options, method: METHOD.DELETE },
      options?.timeout ?? 1000
    );

  private request(
    url: string,
    options: HTTPTransportOptions & { method: METHOD },
    timeout: number
  ): Promise<unknown> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      xhr.onload = () => {
        resolve(xhr);
        console.log(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
