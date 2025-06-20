import {Component, input, OnInit, output, signal} from '@angular/core';
import {IPerson} from '@models/IPerson';
import {IPersonCardComponent} from '@components/people/person-card/i-person-card.component';
import {SearcherComponent} from '@components/people/searcher/searcher-component';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {PaginationButtons} from '@shared/pagination-buttons/pagination-buttons';
import {Pagination} from '@core/interfaces/ApiResponseCollection';

@Component({
  selector: 'app-person-list',
  imports: [
    IPersonCardComponent,
    SearcherComponent,
    CommonModule,
    RouterLink,
    PaginationButtons,
  ],
  templateUrl: './person-list-component.html',
  standalone: true,
  styleUrl: './person-list-component.scss'
})
export class PersonListComponent implements OnInit {
  readonly data = input.required<IPerson[]>();
  readonly pagination = input<Pagination>()

  readonly entity = input.required<string>();
  readonly route = input.required<string>();
  readonly action = input.required<string>();
  readonly option = input.required<boolean>();

  changePage = output<number>();
  delete = output<number>();
  selectedPerson = output<IPerson>()

  personList = signal<IPerson[]>([]);
  paginationData = signal<Pagination | undefined>(undefined);

  ngOnInit() {
    this.personList.set(this.data());
    this.paginationData.set(this.pagination());
  }

  handleResults(results: IPerson[]) {
    if(results.length > 0) this.personList.set(results);
    if(results.length == 0) this.personList.set(this.data());

  }

}

