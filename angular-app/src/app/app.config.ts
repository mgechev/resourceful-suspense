import { ApplicationConfig } from '@angular/core';
import {
  RouteReuseStrategy,
  provideRouter,
  withViewTransitions,
} from '@angular/router';
import { provideClientHydration, withNoHttpTransferCache } from '@angular/platform-browser';
import { provideWindow } from '@ngx-templates/shared/services';
import { withFetchMock, provideFetchApi } from '@ngx-templates/shared/fetch';

import { APP_ROUTES } from './app.routes';
import { CategoriesService } from './data-access/categories.service';
import { ProductsService } from './data-access/products.service';
import { CartService } from './data-access/cart.service';
import { CachedRouteReuseStrategy } from './shared/cached-route-reuse-strategy.service';
import { ecommerceRequestResponseMock } from './shared/utils/ec-request-response-mock';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES, withViewTransitions()),
    provideClientHydration(withNoHttpTransferCache()),
    // Drop the `withFetchMock` implementation argument in order to
    // perform actual network requests via the native Fetch API.
    provideFetchApi(),
    provideWindow(),
    CategoriesService,
    ProductsService,
    CartService,
    {
      provide: RouteReuseStrategy,
      useClass: CachedRouteReuseStrategy,
    },
    provideHttpClient()
  ],
};
