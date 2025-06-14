import {Component, effect, inject, input, output, signal} from '@angular/core';
import {MaterialService} from '@services/http/material-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {Item} from '@models/item';
import {MaterialListComponent} from '@components/items/materials/material-list/material-list';
import {Material} from '@models/material';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ItemFormComponent} from '@components/items/item-form/item-form-component';

@Component({
  selector: 'app-material-join',
  imports: [
    MaterialListComponent,
    FormsModule,
    ReactiveFormsModule,
    ItemFormComponent
  ],
  templateUrl: './material-join.component.html',
  styleUrl: './material-join.component.scss'
})
export class MaterialJoinComponent {
  private service = inject(MaterialService);

  readonly item = input<Item>({} as Item);
  selectedItem = signal<Item>({} as Item);
  finalItem = output<Material>();


  showList = signal<boolean>(false);
  materialResource = rxResource({
    stream : () => {return this.service.getAll();},
  })
  material = signal<Material>(this.materialResource.value()?.data?.results[0] || {} as Material);




  constructor() {
    effect(() => {
      this.item();
      if(this.item()) this.selectedItem.set(this.item());

    });
  }
  toggleShow() {
    this.showList.set(!this.showList());
  }

  reset() {
    this.selectedItem.set({} as Item);
  }


  selectMaterial($event: Material) {
    this.selectedItem.set({material: $event, quantity: 1, price: $event.latestPrice, stock: $event.latestStock});
  }

  toMaterial($event: Item) {
    this.finalItem.emit({
      id: $event.material.id!,
      name: $event.material.name,
      quantity: $event.quantity,
      description: $event.material.description,
      brand: $event.material.brand,
      color: $event.material.color,
      latestStock: $event.material.latestStock,
      latestPrice: $event.material.latestPrice,
      subcategory: $event.material.subcategory,
      measure: $event.material.measure,
    })
  }
}
