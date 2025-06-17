import {Component, output, signal} from '@angular/core';
import {Pagables, payableEntity} from '@models/IOwnable';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-ownable-selector',
  imports: [
    FormsModule
  ],
  templateUrl: './ownable-selector.html',
  styleUrl: './ownable-selector.scss'
})
export class OwnableSelector {

  readonly ownable = signal<payableEntity[]>([payableEntity.Budget, payableEntity.Invoice, payableEntity.Salary]);
  readonly pagables = signal<Pagables[]>([Pagables.Presupuesto, Pagables.Boleta, Pagables.Salario]);
  selectedOwnable = signal<payableEntity>(payableEntity.Budget);
  selected = output<payableEntity>();

}
