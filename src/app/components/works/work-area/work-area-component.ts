import {Component, inject, input} from '@angular/core';
import {WorkService} from '@services/http/work-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {BudgetService} from '@services/http/budget-service';
import {BudgetComponent} from '@components/ownable/budgets/budget/budget.component';
import {WorkDetailComponent} from '@components/works/work-detail-component/work-detail-component';
import {WorkFormComponent} from '@components/works/work-form-component/work-form-component';
import {of} from 'rxjs';
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {Work} from '@models/work';
import {JsonPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-work-area',
  imports: [
    BudgetComponent,
    WorkDetailComponent,
    WorkFormComponent,
    JsonPipe,
    RouterLink
  ],
  templateUrl: './work-area-component.html',
  styleUrl: './work-area-component.scss'
})
export class WorkAreaComponent {
  private service = inject(WorkService);
  private budgetService = inject(BudgetService);
  readonly budgetId = input.required<number>();
  readonly id = input.required<number>();

  budgetResource = rxResource({
    params: () => ({id:this.budgetId()}),
    stream:({params}) =>{
      return this.budgetService.getById(params.id);

    }
  })

  workResource = rxResource({
    params: () => ({id:this.id()}),
    stream: ({params}) => {
      if(params.id >0 ) return this.service.getById(params.id);
      return of({ } as ApiResponse<Work>);
    }
  });

}
