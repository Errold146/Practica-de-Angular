import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { IsLoadingComponent } from "../../../shared/components/is-loading/is-loading.component";

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink, IsLoadingComponent],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {
    countries = input.required<Country[]>()

    errorMessage = input<string | unknown | null>()
    isLoading = input<boolean>(false)
    isEmpty = input<boolean>(false)
}
