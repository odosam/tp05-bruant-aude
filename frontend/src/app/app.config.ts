import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { PanierState } from './panier/panier.state';

export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes),
      provideHttpClient(),
      ApiService,
      importProvidersFrom(NgxsModule.forRoot([PanierState]))
    ]
};