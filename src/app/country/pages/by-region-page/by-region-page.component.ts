import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, resource, signal, OnInit } from '@angular/core';

import { Region } from '../../interfaces/region.type';
import { CountryService } from '../../services/country.service';
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent implements OnInit {

    countryService = inject(CountryService)
    activatedRoute = inject(ActivatedRoute)
    router = inject(Router)

    public regions: Region[] = [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania',
        'Antarctic',
    ]

    selectedRegion = signal<Region | null>(null)

    ngOnInit() {
        // Lee el query param al cargar la página
        const regionParam = this.activatedRoute.snapshot.queryParamMap.get('query') as Region | null;
        if (regionParam && this.regions.includes(regionParam)) {
            this.selectedRegion.set(regionParam);
        }
    }

    countryResource = resource({
        params: () => ({region: this.selectedRegion()}),
        loader: async ({params}) => {
            if ( !params.region ) return []

            this.router.navigate(['/country/by-region'], {
                queryParams: {
                    query: params.region
                }
            })

            return await firstValueFrom(
                this.countryService.searchByRegion(params.region)
            )
        }
    })
}
