type RouteHandler = (match: RegExpMatchArray) => void | Promise<void>;

interface Route {
  pattern: RegExp;
  handler: RouteHandler;
}

export class Router {
  private routes: Route[] = [];
  private basePath: string;

  constructor() {
    // Extract base path from import.meta.env.BASE_URL
    this.basePath = import.meta.env.BASE_URL || '/';
    if (this.basePath !== '/' && this.basePath.endsWith('/')) {
      this.basePath = this.basePath.slice(0, -1);
    }
  }

  register(pattern: RegExp, handler: RouteHandler): void {
    this.routes.push({ pattern, handler });
  }

  async navigate(path: string): Promise<void> {
    // Remove base path from the path
    let cleanPath = path;
    if (this.basePath !== '/' && path.startsWith(this.basePath)) {
      cleanPath = path.slice(this.basePath.length);
    }

    // Ensure leading slash, handle empty path
    if (!cleanPath || cleanPath === '') {
      cleanPath = '/';
    } else if (!cleanPath.startsWith('/')) {
      cleanPath = `/${cleanPath}`;
    }

    console.log('[Router] Navigate:', {
      originalPath: path,
      basePath: this.basePath,
      cleanPath,
      routes: this.routes.length
    });

    for (const route of this.routes) {
      const match = cleanPath.match(route.pattern);
      if (match) {
        console.log('[Router] Matched route:', route.pattern);
        await route.handler(match);
        return;
      }
    }

    // No matching route found
    console.warn(`[Router] No route found for path: ${path} (clean: ${cleanPath})`);
  }

  getCurrentPath(): string {
    let path = window.location.pathname;
    if (this.basePath !== '/' && path.startsWith(this.basePath)) {
      path = path.slice(this.basePath.length);
    }
    return path || '/';
  }
}