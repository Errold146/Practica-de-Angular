import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

import { CountryMapper } from '../mapper/country.mapper';
import { Country } from '../interfaces/country.interface';
import { RestCountry } from '../interfaces/rest-countries.interfaces';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private http = inject(HttpClient)
    private queryCacheCapital = new Map<string, Country[]>()
    private queryCacheCountry = new Map<string, Country[]>()
    private queryCacheRegion = new Map<Region, Country[]>()

    searchByCapital( query: string ): Observable<Country[]> {
        query = query.toLowerCase().trim()

        if ( this.queryCacheCapital.has(query) ) {
            return of( this.queryCacheCapital.get(query) ?? [] )
        }

        return this.http.get<RestCountry[]>(`${API_URL}/capital/${query}`).pipe(
            map( CountryMapper.mapRestCountryArrayToCountryArray ),
            tap( countries => this.queryCacheCapital.set(query, countries) ),
            catchError( err => {
                console.error(err)
                return throwError(() => new Error('No hay resultados, intente de nuevo.'))
            })
        )
    }

    searchByCountry( query: string ) {
        query = query.toLowerCase().trim()
        const url = `${API_URL}/name/${query}`

        if ( this.queryCacheCountry.has(query) ) {
            return of( this.queryCacheCountry.get(query) ?? [] )
        }

        return this.http.get<RestCountry[]>(url).pipe(
            map( CountryMapper.mapRestCountryArrayToCountryArray ),
            tap( country => this.queryCacheCountry.set(query, country) ),
            catchError( err => {
                console.error(err)
                return throwError(() => new Error('No hay resultados, intente de nuevo.'))
            })
        )
    }

    searchByRegion( region: Region ) {
        const url = `${API_URL}/region/${region}`

        if ( this.queryCacheCountry.has(region) ) {
            return of( this.queryCacheRegion.get(region) ?? [] )
        }

        return this.http.get<RestCountry[]>(url).pipe(
            map( CountryMapper.mapRestCountryArrayToCountryArray ),
            tap( country => this.queryCacheRegion.set(region, country) ),
            catchError( err => {
                console.error(err)
                return throwError(() => new Error('No hay resultados, intente de nuevo.'))
            })
        )
    }

    searchCountryByAlphaCode( code: string ) {
        const url = `${API_URL}/alpha/${code}`

        return this.http.get<RestCountry[]>(url).pipe(
            map( CountryMapper.mapRestCountryArrayToCountryArray ),
            map( countries => countries[0] ),
            catchError( err => {
                console.error(err)
                return throwError(() => new Error(`No hay paises con el código: ${code}.`))
            })
        )
    }
}
