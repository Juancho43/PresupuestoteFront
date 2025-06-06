import {Component, inject, input} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {SupplierService} from '@services/http/supplier-service';
import {OwnableListComponent} from '@components/ownable/ownable-list/ownable-list-component';
import {PaymentsTableComponent} from '@shared/payments-table-component/payments-table-component';
import {SupplierComponent} from '../supplier/supplier-component';

@Component({
  selector: 'app-supplier-detail-component',
  imports: [
    OwnableListComponent,
    PaymentsTableComponent,
    SupplierComponent
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

  paymentsResource = rxResource({
    params : () => ({id: this.id() || 0}),
    stream : () => this.service.getPayments(this.id()),
  });
}
