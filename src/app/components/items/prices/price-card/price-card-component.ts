import {Component, input} from '@angular/core';
import {Price} from '@models/price';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-price-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './price-card-component.html',
  styleUrl: './price-card-component.scss'
})
export class PriceCardComponent {
  readonly price = input.required<Price>();
}
