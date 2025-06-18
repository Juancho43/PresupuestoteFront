import {Component, inject, input, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {ClientService} from '@services/http/client-service';
import {ClientComponent} from '../client/client-component';
import {OwnableListComponent} from '@components/ownable/ownable-list/ownable-list-component';
import {PaymentListComponent} from '@components/payments/payment-list/payment-list-component';
import {PaymentFormComponent} from '@components/payments/payment-form/payment-form-component';
import {Budget} from '@models/budget';
import {IOwnable, Pagables, payableEntity, Payables} from '@models/IOwnable';
import {Payment} from '@models/payment';

@Component({
  selector: 'app-client-detail',
  imports: [
    ClientComponent,
    OwnableListComponent,
    PaymentListComponent,
    PaymentFormComponent
  ],
  templateUrl: './client-detail-component.html',
  styleUrl: './client-detail-component.scss'
})
export class ClientDetailComponent {
  private service = inject(ClientService);
  readonly id = input.required<number>();
  protected readonly Payables = Payables;
  protected readonly payableEntity = payableEntity;
  readonly pagable = Pagables.Presupuesto;

  selectedBudget = signal<IOwnable>({} as Budget);
  selectedPayment = signal<Payment>({} as Payment);

  clientResource = rxResource({
    params : () => ({id: this.id() || 0}),
    stream : ({params}) => this.service.getById(params.id),
  })
  pagination = undefined;
  paymentsPage = signal(1);
  paymentsResource = rxResource({
    params : () => ({id: this.id() || 0, page: this.paymentsPage()}),
    stream : ({params}) => this.service.getPayments(params.id,params.page),
  });

  reset() {
    this.selectedBudget.set({} as Budget);
    this.selectedPayment.set({} as Payment);
  }


}
