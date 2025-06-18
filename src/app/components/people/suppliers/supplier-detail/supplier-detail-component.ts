import {Component, inject, input, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {SupplierService} from '@services/http/supplier-service';
import {OwnableListComponent} from '@components/ownable/ownable-list/ownable-list-component';
import {SupplierComponent} from '../supplier/supplier-component';
import {PaymentListComponent} from '@components/payments/payment-list/payment-list-component';
import {Pagination} from '@core/interfaces/ApiResponseCollection';
import {PaymentFormComponent} from '@components/payments/payment-form/payment-form-component';
import {IOwnable, Pagables, payableEntity, Payables} from '@models/IOwnable';
import {Payment} from '@models/payment';
import {Invoice} from '@models/invoice';

@Component({
  selector: 'app-supplier-detail',
  imports: [
    OwnableListComponent,
    SupplierComponent,
    PaymentListComponent,
    PaymentFormComponent
  ],
  templateUrl: './supplier-detail-component.html',
  styleUrl: './supplier-detail-component.scss'
})
export class SupplierDetailComponent {
  private service = inject(SupplierService);
  readonly id = input.required<number>();
  readonly pagable = Pagables.Boleta;
  protected readonly Payables = Payables;
  selectedInvoice = signal<IOwnable>({} as Invoice);
  selectedPayment = signal<Payment>({} as Payment);
  supplierResource = rxResource({
    params : () => ({id: this.id() || 0}),
    stream : (params) => this.service.getById(params.params.id),
  })
  pagination = {} as Pagination;
  paymentsPage = signal(1);
  paymentsResource = rxResource({
    params : () => ({id: this.id() || 0, page: this.paymentsPage()}),
    stream : ({params}) => this.service.getPayments(params.id,params.page),
  });
  protected readonly payableEntity = payableEntity;

  reset(){
    this.selectedInvoice.set({} as Invoice);
    this.selectedPayment.set({} as Payment);
  }
}
