import {Component, input} from '@angular/core';
import {Material} from '@models/material';
import {CurrencyPipe} from '@angular/common';
@Component({
  selector: 'app-item-card',
  imports: [
    CurrencyPipe,
  ],
  templateUrl: './item-card.html',
  styleUrl: './item-card.scss'
})
export class ItemCard {
  readonly item = input.required<Material>();
}
