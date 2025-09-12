import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { firstValueFrom } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {

    countryService = inject(CountryService)
    query = signal('')

    countryResource = resource({
        params: () => ({ query: this.query() }),
        loader: async ({params}) => {
            if ( !params.query ) return [];

            return await firstValueFrom(
                this.countryService.searchByCountry(params.query)
            )
        }
    })
}
