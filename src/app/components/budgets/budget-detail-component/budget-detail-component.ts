import {Component, inject, input} from '@angular/core';
import {ClientComponent} from '../../clients/client/client-component';
import {BudgetService} from '../../../core/services/http/budget-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {BudgetComponent} from '../budget-component-component/budget.component';
import {WorkComponent} from '../../works/work/work.component';
import {WorkListComponent} from '../../works/work-list-component/work-list-component';
import {WorkService} from '../../../core/services/http/work-service';
import {WorkDetailComponent} from '../../works/work-detail-component/work-detail-component';
import {RouterLink} from '@angular/router';
import {ApiResponse} from '../../../core/interfaces/ApiResponse';
import {Work} from '../../../core/interfaces/Entities/work';
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
  readonly workId = input<number>(0)
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
