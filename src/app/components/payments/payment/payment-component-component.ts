import {Component, input} from '@angular/core';
import {Payment} from '@models/payment';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './payment-component-component.html',
  styleUrl: './payment-component-component.scss'
})
export class PaymentComponentComponent {
  readonly payment = input.required<Payment>();

}
