import {Component, inject, input} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {ClientService} from '@services/http/client-service';
import {ClientComponent} from '../client/client-component';
import {PaymentsTableComponent} from '@shared/payments-table-component/payments-table-component';
import {OwnableListComponent} from '@components/ownable/ownable-list/ownable-list-component';

@Component({
  selector: 'app-client-detail-component',
  imports: [
    ClientComponent,
    PaymentsTableComponent,
    OwnableListComponent
  ],
  templateUrl: './client-detail-component.html',
  styleUrl: './client-detail-component.scss'
})
export class ClientDetailComponent {
  private service = inject(ClientService);
  readonly id = input.required<number>();

  clientResource = rxResource({
    params : () => ({id: this.id() || 0}),
    stream : (params) => this.service.getById(params.params.id),
  })

  paymentsResource = rxResource({
    params : () => ({id: this.id() || 0}),
    stream : () => this.service.getPayments(this.id()),
  });
}
