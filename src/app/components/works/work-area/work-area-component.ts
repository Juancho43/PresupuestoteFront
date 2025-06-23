import {Component, input, signal} from '@angular/core';
import {WorkFormComponent} from '@components/works/work-form/work-form-component';
import {MaterialJoinComponent} from '@components/items/materials/material-join/material-join.component';
import {Item} from '@models/item';
import {Material} from '@models/material';


@Component({
  standalone:true,
  selector: 'app-work-area',
  imports: [
    WorkFormComponent,
    MaterialJoinComponent,
  ],
  templateUrl: './work-area-component.html',
  styleUrl: './work-area-component.scss'
})
export class WorkAreaComponent {
  readonly budgetId = input.required<number>();
  readonly id = input.required<number>();

  item = signal<Item>({} as Item);
  material = signal<Material>({} as Material);

  onEditMaterial($event: Material) {
    this.item.set({
      material : $event,
      quantity: $event.quantity!,
      price: $event.latestPrice!,
      stock: $event.latestStock!
    })
  }

  onEditedMaterial($event: Material) {
    this.material.set(
      $event
    )
  }


}
