import {Component, input} from '@angular/core';
import {Supplier} from '../../../core/interfaces/Entities/supplier';

@Component({
  selector: 'app-supplier',
  imports: [],
  templateUrl: './supplier-component.html',
  styleUrl: './supplier-component.scss'
})
export class SupplierComponent {
  readonly supplier = input.required<Supplier>();
}
