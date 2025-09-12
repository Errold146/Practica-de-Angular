import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { countryRoutes } from './country/country.routes';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'country',
        children: countryRoutes
    },
    {
        path: '**',
        redirectTo: ''
    }
];
