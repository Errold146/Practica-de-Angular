import { Country } from "../interfaces/country.interface";
import { RestCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper {

    static mapRestCountryToCountry(restCountry: RestCountry): Country {
        return {
            capital: restCountry.capital?.join(', '),
            cca2: restCountry.cca2,
            flag: restCountry.flag,
            flagSvg: restCountry.flags.svg,
            name: restCountry.translations['spa'].common ?? 'No Spanish name',
            population: restCountry.population,
            region: restCountry.region,
            subRegion: restCountry.subregion,
        }
    }

    static mapRestCountryArrayToCountryArray( restCountries: RestCountry[] ): Country[] {
        return restCountries.map( CountryMapper.mapRestCountryToCountry )
    }
}
