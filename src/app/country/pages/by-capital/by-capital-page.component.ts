import { rxResource } from '@angular/core/rxjs-interop';
import { Component, inject, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Country } from '../../interfaces/country.interface';

@Component({
    selector: 'by-capital-page',
    imports: [SearchInputComponent, CountryListComponent],
    templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

    countryService = inject(CountryService);
    query = signal('');

    // countryResource = rxResource<string, Country[]>({
    //     request: () => this.query(), // aquí el "request" es un string
    //     loader: (query: string) => this.countryService.searchByCapital(query)
    // });

}


// Resorces con Promises
// countryResource = resource({
//     params: () => ({ query: this.query() }),
//     loader: async ({params}) => {
//         if ( !params.query ) return [];

//         return await firstValueFrom(
//             this.countryService.searchByCapital(params.query)
//         )
//     }
// })

// OTRA FORMA DE HACERLO, VERSIÓN MÁS ESTABLE...
// isLoading = signal(false)
// isError = signal<string|null>(null)
// countries = signal<Country[]>([])

// onSearch(query: string) {

//     if ( this.isLoading() ) return;

//     this.isLoading.set(true)
//     this.isError.set(null)

//     this.countryService.searchByCapital(query).subscribe({
//         next: (countries) => {
//             this.isLoading.set(false)
//             this.countries.set(countries)
//         },
//         error: (err) => {
//             this.isLoading.set(false)
//             this.countries.set([])
//             this.isError.set(err)
//         },
//     })
// }
