import {Component, input} from '@angular/core';
import {Material} from '@models/material';
import {CurrencyPipe} from '@angular/common';


@Component({
  selector: 'app-item-list',
  imports: [
    CurrencyPipe,
  ],
  templateUrl: './item-list-component.html',
  styleUrl: './item-list-component.scss'
})
export class ItemListComponent {
  readonly items = input.required<Material[]>();
}
