import {Component, inject, input} from '@angular/core';
import {MaterialComponent} from '@components/items/materials/material/material.component';
import {StockListComponent} from '@components/items/stocks/stock-list-component/stock-list-component';
import {PriceListComponent} from '@components/items/prices/price-list-component/price-list-component';
import {MaterialService} from '@services/http/material-service';
import {rxResource} from '@angular/core/rxjs-interop';

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
  private service = inject(MaterialService);
  readonly id = input.required<number>();

  materialResource = rxResource({
    params : ()=>{return {id: this.id()}},
    stream : ({params}) => this.service.getById(params.id),
  })
}
