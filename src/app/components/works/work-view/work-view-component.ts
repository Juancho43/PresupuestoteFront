import {Component, inject, signal} from '@angular/core';
import {WorkListComponent} from '@components/works/work-list/work-list-component';
import {WorkService} from '@services/http/work-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {Budget} from '@models/budget';
import {BudgetComponent} from '@components/ownable/budgets/budget/budget.component';
import {RouterLink} from '@angular/router';
import {TextAdvise} from '@shared/text-advise/text-advise';

@Component({
  selector: 'app-work-view',
  imports: [
    WorkListComponent,
    BudgetComponent,
    RouterLink,
    TextAdvise

  ],
  templateUrl: './work-view-component.html',
  styleUrl: './work-view-component.scss'
})
export class WorkViewComponent {
  private service = inject(WorkService);
  page = signal(1);
  workResource = rxResource({
    params: () => {
      return {page: this.page()}
    },
    stream: ({params}) => {
      return this.service.getAll(params.page)
    },
  });

  budgetSelected = signal<Budget>({} as Budget);
}
