import {Component, inject, input} from '@angular/core';
import {ClientComponent} from '@components/people/clients/client/client-component';
import {BudgetService} from '@services/http/budget-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {BudgetComponent} from '../budget/budget.component';
import {WorkListComponent} from '@components/works/work-list/work-list-component';
import {WorkService} from '@services/http/work-service';
import {RouterLink} from '@angular/router';
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {Work} from '@models/work';
import {of} from 'rxjs';
import {WorkComponent} from '@components/works/work/work.component';
import {ItemListComponent} from '@components/items/item-list/item-list-component';

@Component({
  selector: 'app-budget-detail',
  imports: [
    ClientComponent,
    BudgetComponent,
    WorkListComponent,
    RouterLink,
    WorkComponent,
    ItemListComponent
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
