import {Component, inject, input, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {ClientService} from '@services/http/client-service';
import {ClientComponent} from '../client/client-component';
import {OwnableListComponent} from '@components/ownable/ownable-list/ownable-list-component';
import {PaymentListComponent} from '@components/payments/payment-list/payment-list-component';
import {Pagination} from '@core/interfaces/ApiResponseCollection';

@Component({
  selector: 'app-client-detail',
  imports: [
    ClientComponent,
    OwnableListComponent,
    PaymentListComponent
  ],
  templateUrl: './client-detail-component.html',
  styleUrl: './client-detail-component.scss'
})
export class ClientDetailComponent {
  private service = inject(ClientService);
  readonly id = input.required<number>();

  clientResource = rxResource({
    params : () => ({id: this.id() || 0}),
    stream : ({params}) => this.service.getById(params.id),
  })
  pagination = {} as Pagination;
  paymentsPage = signal(1);
  paymentsResource = rxResource({
    params : () => ({id: this.id() || 0, page: this.paymentsPage()}),
    stream : ({params}) => this.service.getPayments(params.id,params.page),
  });


}
