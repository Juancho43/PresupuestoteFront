import {Component, input} from '@angular/core';
import {Supplier} from '@models/supplier';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-supplier',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './supplier-component.html',
  styleUrl: './supplier-component.scss'
})
export class SupplierComponent {
  readonly supplier = input.required<Supplier>();
}
