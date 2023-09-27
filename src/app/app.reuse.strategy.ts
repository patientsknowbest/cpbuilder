import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';
import {ElementsComponent} from "./elements/elements.component";

interface RouteStorageObject {
  snapshot: ActivatedRouteSnapshot;
  handle: DetachedRouteHandle;
}

export class AppReuseStrategy implements RouteReuseStrategy {
  private routeStore = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const path = route.routeConfig?.path;
    return <boolean>(path && ['/','generate-component'].includes(<string>path));
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.routeStore.set(<string>route.routeConfig?.path, handle);
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // @ts-ignore
    const path = route.routeConfig.path;
    return <boolean>(
      path && ['/','generate-component'].includes(path) && !!this.routeStore.get(path)
    );
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {

    const path = route.routeConfig?.path;
    return <DetachedRouteHandle>this.routeStore?.get(<string>path);
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
