import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, inject, resource } from '@angular/core';

import { CountryService } from '../../services/country.service';
import { CountryInfoComponent } from "./country-info/country-info.component";
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { IsLoadingComponent } from '../../../shared/components/is-loading/is-loading.component';

@Component({
  selector: 'country-page',
  imports: [NotFoundComponent, IsLoadingComponent, CountryInfoComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

    countryCode = inject(ActivatedRoute).snapshot.params['code']
    countryService = inject(CountryService)

    countryResource = resource({
        params: () => ({ code: this.countryCode }),
        loader: ({params}) => {
            return firstValueFrom(this.countryService.searchCountryByAlphaCode(params.code))
        }
    })
}
