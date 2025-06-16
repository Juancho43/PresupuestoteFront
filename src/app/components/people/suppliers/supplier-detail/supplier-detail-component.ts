import {Component, inject, input, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {SupplierService} from '@services/http/supplier-service';
import {OwnableListComponent} from '@components/ownable/ownable-list/ownable-list-component';
import {SupplierComponent} from '../supplier/supplier-component';
import {PaymentListComponent} from '@components/payments/payment-list/payment-list-component';
import {Pagination} from '@core/interfaces/ApiResponseCollection';

@Component({
  selector: 'app-supplier-detail',
  imports: [
    OwnableListComponent,
    SupplierComponent,
    PaymentListComponent
  ],
  templateUrl: './supplier-detail-component.html',
  styleUrl: './supplier-detail-component.scss'
})
export class SupplierDetailComponent {
  private service = inject(SupplierService);
  readonly id = input.required<number>();

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
}
