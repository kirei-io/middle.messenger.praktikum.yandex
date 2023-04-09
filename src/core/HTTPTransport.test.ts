import { SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest } from "sinon";
import { HTTPTransport } from "./HTTPTransport";
import sinon from "sinon";
import { expect } from "chai";

describe("HTTPTransport class", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new HTTPTransport({
      endpoint: "/auth",
    });
  });

  afterEach(() => {
    requests.length = 0;
  });
  it("GET", () => {
    instance.get("/user");

    const [request] = requests;

    expect(request.method).to.eq("GET");
  });

  it("GET no body", () => {
    const data = {
      id: "test",
    };
    instance.get("/user", { data });

    const [request] = requests;

    expect(request.requestBody).to.undefined;
  });

  it("POST w/ body", () => {
    const data = {
      id: "test",
    };
    instance.post("/user", {
      data,
    });
    const [request] = requests;
    expect(request.requestBody).to.eq(JSON.stringify(data));
  });

  it("POST w/ FormData", () => {
    const data = new FormData();
    instance.post("/user", {
      data,
    });
    const [request] = requests;
    expect(request.requestBody).to.eq(data);
  });

  it("PUT", () => {
    instance.put("/user");

    const [request] = requests;

    expect(request.method).to.eq("PUT");
  });

  it("DELETE", () => {
    instance.delete("/user");

    const [request] = requests;

    expect(request.method).to.eq("DELETE");
  });
});
