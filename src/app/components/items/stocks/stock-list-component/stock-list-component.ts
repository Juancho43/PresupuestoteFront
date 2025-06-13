import {Component, input} from '@angular/core';
import {Stock} from '@models/stock';
import {StockCardComponent} from '@components/items/stocks/stock-card-component/stock-card-component';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [
    StockCardComponent
  ],
  templateUrl: './stock-list-component.html',
  styleUrl: './stock-list-component.scss'
})
export class StockListComponent {
  readonly stockList = input.required<Stock[]>()

}
