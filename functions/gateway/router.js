const Route = require("route-parser");

const ROUTE_BASE = "/api";

/**
 * Top-level routing class that handles all incoming gateway requests
 */
class Router {
  constructor(route) {
    this.route = new Route(ROUTE_BASE + route);
    this.rawRoute = route;
    this.getHandler = () => undefined;
    this.postHandler = () => undefined;
    this.putHandler = () => undefined;
    this.patchHandler = () => undefined;
    this.deleteHandler = () => undefined;
  }

  get(handler) {
    this.getHandler = handler;
    return this;
  }

  post(handler) {
    this.postHandler = handler;
    return this;
  }

  put(handler) {
    this.putHandler = handler;
    return this;
  }

  patch(handler) {
    this.patchHandler = handler;
    return this;
  }

  delete(handler) {
    this.deleteHandler = handler;
    return this;
  }

  handle(event, log, ctx) {
    const {
      path,
      httpMethod,
      queryStringParameters,
      multiValueQueryStringParameters,
      headers,
      body,
      ...restEvent
    } = event;
    const matchedRouting = this.getRouteHandler().match(path);
    if (matchedRouting) {
      const handlerInput = {
        ctx,
        params: matchedRouting,
        query: queryStringParameters,
        multiValueQuery: multiValueQueryStringParameters,
        headers,
        body:
          headers["content-type"] === "application/json"
            ? JSON.parse(body)
            : body,
        ...restEvent,
      };
      log.http(handlerInput, { type: "request", path, httpMethod });
      switch (httpMethod) {
        case "GET":
          return this.getHandler(handlerInput, log);
        case "POST":
          return this.postHandler(handlerInput, log);
        case "PUT":
          return this.putHandler(handlerInput, log);
        case "PATCH":
          return this.patchHandler(handlerInput, log);
        case "DELETE":
          return this.deleteHandler(handlerInput, log);
      }
    }
  }

  getRouteHandler() {
    return this.route;
  }

  getRoute() {
    return this.rawRoute;
  }
}

module.exports = args => new Router(args);
