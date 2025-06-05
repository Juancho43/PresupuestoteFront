import {Component, input} from '@angular/core';
import {Budget} from '../../../core/interfaces/Entities/budget';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-budget',
  imports: [
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent {
  readonly budget = input.required<Budget>();
}
