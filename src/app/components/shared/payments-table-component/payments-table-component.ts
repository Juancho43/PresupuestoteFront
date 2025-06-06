import {Component, input} from '@angular/core';
import {Payment} from '../../../core/interfaces/entities/payment';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-payments-table-component',
  imports: [
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './payments-table-component.html',
  styleUrl: './payments-table-component.scss'
})
export class PaymentsTableComponent {
  readonly payments = input.required<Payment[]>();
}
