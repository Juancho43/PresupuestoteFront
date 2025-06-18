import {Component, input} from '@angular/core';
import {Invoice} from '@models/invoice';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-invoice',
  imports: [
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {

  readonly invoice = input.required<Invoice>();


}
