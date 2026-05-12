import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ApiConfiguration } from '@api-resp-differ/api-client';

import { routes } from './app.routes';

const apiConfig = new ApiConfiguration();
apiConfig.rootUrl = '';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: ApiConfiguration, useValue: apiConfig },
  ],
};
