import {Component, inject, input} from '@angular/core';
import {StockListComponent} from '@components/items/stocks/stock-list-component/stock-list-component';
import {PriceListComponent} from '@components/items/prices/price-list-component/price-list-component';
import {MaterialService} from '@services/http/material-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {OwnableListComponent} from '@components/ownable/ownable-list/ownable-list-component';
import {WorkListComponent} from '@components/works/work-list-component/work-list-component';

@Component({
  selector: 'app-material-detail-component',
  imports: [
    StockListComponent,
    PriceListComponent,
    OwnableListComponent,
    WorkListComponent
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
  priceResource = rxResource({
    params : ()=>{return {id: this.id()}},
    stream : ({params}) => this.service.getByIdWithPrices(params.id),
  })
  stockResource = rxResource({
    params : ()=>{return {id: this.id()}},
    stream : ({params}) => this.service.getByIdWithStocks(params.id),
  })
  invoiceResource = rxResource({
    params : ()=>{return {id: this.id()}},
    stream : ({params}) => this.service.getByIdWithInvoices(params.id),
  })
  workResource = rxResource({
    params : ()=>{return {id: this.id()}},
    stream : ({params}) => this.service.getByIdWithWorks(params.id),
  })
}
