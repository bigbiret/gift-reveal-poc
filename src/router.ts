type RouteHandler = (match: RegExpMatchArray) => void | Promise<void>;

interface Route {
  pattern: RegExp;
  handler: RouteHandler;
}

export class Router {
  private routes: Route[] = [];

  register(pattern: RegExp, handler: RouteHandler): void {
    this.routes.push({ pattern, handler });
  }

  async navigate(path: string): Promise<void> {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    for (const route of this.routes) {
      const match = cleanPath.match(route.pattern);
      if (match) {
        await route.handler(match);
        return;
      }
    }

    // No matching route found
    console.warn(`No route found for path: ${path}`);
  }

  getCurrentPath(): string {
    return window.location.pathname;
  }
}