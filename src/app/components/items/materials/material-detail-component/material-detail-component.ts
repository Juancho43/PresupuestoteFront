import {Component} from '@angular/core';
import {MaterialComponent} from '@components/items/materials/material/material.component';
import {StockListComponent} from '@components/items/stocks/stock-list-component/stock-list-component';
import {PriceListComponent} from '@components/items/prices/price-list-component/price-list-component';

@Component({
  selector: 'app-material-detail-component',
  imports: [
    MaterialComponent,
    StockListComponent,
    PriceListComponent
  ],
  templateUrl: './material-detail-component.html',
  styleUrl: './material-detail-component.scss'
})
export class MaterialDetailComponent {

}
