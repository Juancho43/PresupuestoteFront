import {Component, input} from '@angular/core';
import {Supplier} from '@models/supplier';

@Component({
  selector: 'app-supplier',
  imports: [],
  templateUrl: './supplier-component.html',
  styleUrl: './supplier-component.scss'
})
export class SupplierComponent {
  readonly supplier = input.required<Supplier>();
}
