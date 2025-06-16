import {Component, input, output, signal} from '@angular/core';
import {Payment} from '@models/payment';
import {PaginationButtons} from '@shared/pagination-buttons/pagination-buttons';
import {Pagination} from '@core/interfaces/ApiResponseCollection';
import {PaymentCardComponent} from '@components/payments/payment-card/payment-card-component';

@Component({
  selector: 'app-payment-list',
  imports: [
    PaginationButtons,
    PaymentCardComponent
  ],
  templateUrl: './payment-list-component.html',
  styleUrl: './payment-list-component.scss'
})
export class PaymentListComponent {
  readonly data = input.required<Payment[]>()
  readonly pagination = input.required<Pagination>();
  pageChange = output<number>();
  selectedPayment = output<Payment>();
  route = signal<any | null>(null);


}
