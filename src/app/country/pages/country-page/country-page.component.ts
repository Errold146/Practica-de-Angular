import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'country-page',
  imports: [],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent { }
