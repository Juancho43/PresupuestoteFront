import {Component, input, OnInit, output, signal} from '@angular/core';
import {Work} from '@models/work';
import {WorkCardComponent} from '@components/works/work-card/work-card-component';
import {RouterLink} from '@angular/router';
import {Pagination} from '@core/interfaces/ApiResponseCollection';
import {PaginationButtons} from '@shared/pagination-buttons/pagination-buttons';
import {Budget} from '@models/budget';
import {WorkSearchComponent} from '@components/works/work-search/work-search-component';

@Component({
  selector: 'app-work-list',
  imports: [
    WorkCardComponent,
    RouterLink,
    PaginationButtons,
    WorkSearchComponent
  ],
  templateUrl: './work-list-component.html',
  styleUrl: './work-list-component.scss'
})
export class WorkListComponent implements OnInit {
  readonly works = input.required<Work[]>()
  readonly budgetId = input.required<number>();
  readonly pagination= input<Pagination>();
  readonly option = input<boolean>(true);
  changePage = output<number>();
  selected = output<Budget>();

  workList = signal<Work[]>([]);

  ngOnInit() {
    this.workList.set(this.works());
  }
  handleResults(results: Work[]) {
    if(results.length > 0) this.workList.set(results);
    if(results.length === 0) this.workList.set(this.works());
  }
}
