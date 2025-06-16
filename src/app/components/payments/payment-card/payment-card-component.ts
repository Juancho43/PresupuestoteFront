import {Component, input, Input} from '@angular/core';
import {Payment} from '@models/payment';
import {CardButtonComponent} from '@shared/card-button/card-button-component';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-payment-card',
  imports: [
    CardButtonComponent,
    CurrencyPipe
  ],
  templateUrl: './payment-card-component.html',
  styleUrl: './payment-card-component.scss'
})
export class PaymentCardComponent {
  readonly payment = input.required<Payment>();
  @Input() route!: any;

}
