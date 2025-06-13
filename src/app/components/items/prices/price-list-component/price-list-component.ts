import {Component, input} from '@angular/core';
import {Price} from '@models/price';
import {PriceCardComponent} from '@components/items/prices/price-card-component/price-card-component';

@Component({
  selector: 'app-price-list',
  standalone: true,
  imports: [
    PriceCardComponent
  ],
  templateUrl: './price-list-component.html',
  styleUrl: './price-list-component.scss'
})
export class PriceListComponent {
  readonly priceList = input.required<Price[]>()
}
