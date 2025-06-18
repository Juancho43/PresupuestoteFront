import {Component, effect, inject, input, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {InvoiceService} from '@services/http/invoice-service';
import {OwnableListComponent} from '@components/ownable/ownable-list/ownable-list-component';
import {PersonListComponent} from '@components/people/person-list/person-list-component';
import {InvoiceFormComponent} from '@components/ownable/invoices/invoice-form/invoice-form-component';
import {SupplierService} from '@services/http/supplier-service';
import {Pagables, payableEntity} from '@models/IOwnable';

@Component({
  selector: 'app-invoice-view',
  imports: [
    OwnableListComponent,
    PersonListComponent,
    InvoiceFormComponent
  ],
  templateUrl: './invoice-view-component.html',
  styleUrl: './invoice-view-component.scss'
})
export class InvoiceViewComponent {
  private service = inject(InvoiceService);
  private supplierService = inject(SupplierService);
  readonly supplierId = input<number>(0);
  readonly id = input(0);
  owner = signal<number>(0);
  supplierPage = signal(1);
  invoicePage = signal(1);
  invoicesResource = rxResource({
    params: ()=>{
      return{ page: this.invoicePage()}
    },
    stream :({params}) => {
      return this.service.getAll(params.page);
    }
  })

  supplierResource = rxResource({
    params: () =>{return{page : this.supplierPage()}},
    stream :({params}) => {
      return this.supplierService.getAll(params.page);
    }
  })
  constructor() {
    effect(() => {
      this.owner.set(this.supplierId());
    });
  }

  protected readonly payableEntity = payableEntity;
  protected readonly Pagables = Pagables;
}
