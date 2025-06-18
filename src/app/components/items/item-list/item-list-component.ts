import {Component, input} from '@angular/core';
import {Material} from '@models/material';
import {ItemCard} from '@components/items/item-card/item-card';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-item-list',
  imports: [
    ItemCard,
    RouterLink,
  ],
  templateUrl: './item-list-component.html',
  styleUrl: './item-list-component.scss'
})
export class ItemListComponent {
  readonly items = input.required<Material[]>();
}
