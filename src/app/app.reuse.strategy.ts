import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';

interface RouteStorageObject {
  snapshot: ActivatedRouteSnapshot;
  handle: DetachedRouteHandle;
}

export class AppReuseStrategy implements RouteReuseStrategy {
  private routeStore = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // @ts-ignore
    const path = route.routeConfig.path;
    // @ts-ignore
    return path && ['elements-component', 'generate-component'].includes(path);
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // @ts-ignore
    this.routeStore.set(route.routeConfig.path, handle);
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // @ts-ignore
    const path = route.routeConfig.path;
    // @ts-ignore
    return (
        path && ['elements-component', 'generate-component'].includes(path) && !!this.routeStore.get(path)
    );
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    // @ts-ignore
    const path = route.routeConfig.path;
    // @ts-ignore
    return this.routeStore.get(path);
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
