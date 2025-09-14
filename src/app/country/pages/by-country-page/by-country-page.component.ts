import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject, linkedSignal, resource } from '@angular/core';

import { CountryService } from '../../services/country.service';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";

@Component({
  selector: 'by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {

    countryService = inject(CountryService)
    activatedRoute = inject(ActivatedRoute)
    router = inject(Router)

    queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''
    query = linkedSignal(() => this.queryParam)

    countryResource = resource({
        params: () => ({ query: this.query() }),
        loader: async ({params}) => {
            if ( !params.query ) return [];

            this.router.navigate(['/country/by-country'], {
                queryParams: {
                    query: params.query
                }
            })

            return await firstValueFrom(
                this.countryService.searchByCountry(params.query)
            )
        }
    })
}
