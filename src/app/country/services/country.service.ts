import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { CountryMapper } from '../mapper/country.mapper';
import { Country } from '../interfaces/country.interface';
import { RestCountry } from '../interfaces/rest-countries.interfaces';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private http = inject(HttpClient)

    searchByCapital( query: string ): Observable<Country[]> {
        query = query.toLowerCase().trim()

        return this.http.get<RestCountry[]>(`${API_URL}/capital/${query}`).pipe(
            map( CountryMapper.mapRestCountryArrayToCountryArray ),
            catchError( err => {
                return throwError(() => new Error('No hay resultados, intente de nuevo.'))
            })
        )
    }

    searchByCountry( query: string ) {
        query = query.toLowerCase().trim()
        const url = `${API_URL}/name/${query}`

        return this.http.get<RestCountry[]>(url).pipe(
            map( CountryMapper.mapRestCountryArrayToCountryArray ),
            catchError( err => {
                return throwError(() => new Error('No hay resultados, intente de nuevo.'))
            })
        )
    }
}
