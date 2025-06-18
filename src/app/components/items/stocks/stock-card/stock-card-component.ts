import {Component, input} from '@angular/core';
import {Stock} from '@models/stock';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-stock-card',
  standalone : true,
  imports: [
    DatePipe
  ],
  templateUrl: './stock-card-component.html',
  styleUrl: './stock-card-component.scss'
})
export class StockCardComponent {
  readonly stock = input.required<Stock>();
}
