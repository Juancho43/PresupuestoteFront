import {Component, inject, input, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {Item} from '@models/item';
import {Material} from '@models/material';
import {InvoiceService} from '@services/http/invoice-service';
import {Invoice} from '@models/invoice';
import {MaterialJoinComponent} from '@components/items/materials/material-join/material-join.component';
import {InvoiceMaterialForm} from '@components/ownable/invoices/invoice-material-form/invoice-material-form';
import {PriceForm} from '@components/items/prices/price-form/price-form.component';

@Component({
  selector: 'app-invoice-area-component',
  imports: [
    MaterialJoinComponent,
    InvoiceMaterialForm,
    PriceForm
  ],
  templateUrl: './invoice-area-component.html',
  styleUrl: './invoice-area-component.scss',
  standalone: true
})
export class InvoiceAreaComponent {
  private service = inject(InvoiceService);
  readonly invoiceId = input.required<number>();
  readonly id = input.required<number>();


  invoiceResource = rxResource({
    params: () => ({id:this.id()}),
    stream: ({params}) => {
      if(params.id > 0 ) return this.service.getById(params.id);
      return of({ } as ApiResponse<Invoice>);
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
    this.onEditMaterial($event)
  }

}
