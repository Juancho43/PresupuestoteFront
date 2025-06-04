import {Component, input} from '@angular/core';
import {Budget} from '../../../core/interfaces/Entities/budget';

@Component({
  selector: 'app-budget-list-component',
  imports: [],
  templateUrl: './budget-list-component.html',
  styleUrl: './budget-list-component.scss'
})
export class BudgetListComponent {
  readonly budgets = input.required<Budget[]>()
}
