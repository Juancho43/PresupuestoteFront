import {Component, input} from '@angular/core';
import {Stock} from '@models/stock';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-stock-card',
  standalone : true,
  imports: [
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './stock-card-component.html',
  styleUrl: './stock-card-component.scss'
})
export class StockCardComponent {
  readonly stock = input.required<Stock>();
}
