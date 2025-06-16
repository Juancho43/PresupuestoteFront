import {Component, inject, input, signal} from '@angular/core';
import {WorkService} from '@services/http/work-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {WorkFormComponent} from '@components/works/work-form/work-form-component';
import {of} from 'rxjs';
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {Work} from '@models/work';
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
  private service = inject(WorkService);
  readonly budgetId = input.required<number>();
  readonly id = input.required<number>();


  workResource = rxResource({
    params: () => ({id:this.id()}),
    stream: ({params}) => {
      if(params.id > 0 ) return this.service.getById(params.id);
      return of({ } as ApiResponse<Work>);
    }
  });


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
