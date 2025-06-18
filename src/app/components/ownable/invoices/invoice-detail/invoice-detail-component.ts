import {Component, inject, input} from '@angular/core';
import {InvoiceComponent} from '@components/ownable/invoices/invoice/invoice.component';
import {SupplierComponent} from '@components/people/suppliers/supplier/supplier-component';
import {RouterLink} from '@angular/router';
import {ItemListComponent} from '@components/items/item-list/item-list-component';
import {InvoiceService} from '@services/http/invoice-service';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-invoice-detail',
  imports: [
    InvoiceComponent,
    SupplierComponent,
    RouterLink,
    ItemListComponent
  ],
  standalone: true,
  templateUrl: './invoice-detail-component.html',
  styleUrl: './invoice-detail-component.scss'
})
export class InvoiceDetailComponent {

  private service = inject(InvoiceService);
  readonly id = input(0);

  invoiceResource = rxResource({
    params: () => {return{id : this.id()}},
    stream:({params}) => this.service.getById(params.id),
  })


}
