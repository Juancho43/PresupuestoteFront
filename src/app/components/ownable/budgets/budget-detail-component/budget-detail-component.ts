import {Component, inject, input} from '@angular/core';
import {ClientComponent} from '@components/ownable/clients/client/client-component';
import {BudgetService} from '@services/http/budget-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {BudgetComponent} from '../budget/budget.component';
import {WorkListComponent} from '../../../works/work-list-component/work-list-component';
import {WorkService} from '@services/http/work-service';
import {WorkDetailComponent} from '../../../works/work-detail-component/work-detail-component';
import {RouterLink} from '@angular/router';
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {Work} from '@models/work';
import {of} from 'rxjs';

@Component({
  selector: 'app-budget-detail-component',
  imports: [
    ClientComponent,
    BudgetComponent,
    WorkListComponent,
    WorkDetailComponent,
    RouterLink
  ],
  templateUrl: './budget-detail-component.html',
  styleUrl: './budget-detail-component.scss'
})
export class BudgetDetailComponent {
  private service = inject(BudgetService);
  private workService = inject(WorkService);
  readonly id = input<number>(0);
  readonly workId = input<number>(0);

  budgetResource = rxResource({
    params : () => ({id: this.id() || 0}),
    stream : ({params}) => this.service.getById(params.id),
  })

  currentWorkResource = rxResource({
    params: () => ({workId: this.workId() || 0}),
    stream: ({params}) => {
      if(params.workId > 0) return this.workService.getById(params.workId);
      return of({} as ApiResponse<Work>);
    },
  })
}
