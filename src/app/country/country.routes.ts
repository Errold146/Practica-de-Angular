import { Routes } from '@angular/router';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { ByCapitalPageComponent } from './pages/by-capital/by-capital-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryLayoutComponent } from './layouts/CountryLayout/CountryLayout.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';

export const countryRoutes: Routes = [
    {
        path: '',
        component: CountryLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'by-capital',
                pathMatch: 'full'
            },
            {
                path: 'by-capital',
                component: ByCapitalPageComponent
            },
            {
                path: 'by-country',
                component: ByCountryPageComponent
            },
            {
                path: 'by-region',
                component: ByRegionPageComponent
            },
            {
                path: 'by/:code',
                component: CountryPageComponent
            },
        ]
    }
];
