import {Component, effect, input, OnInit, output, signal} from '@angular/core';
import {IOwnable, Pagables, payableEntity} from '@models/IOwnable';
import {OwnableCardComponent} from '@components/ownable/ownable-card/ownable-card-component';
import {OwnableSearcherComponent} from '@components/ownable/ownable-searcher/ownable-searcher.component';
import {RouterLink} from '@angular/router';
import {Pagination} from '@core/interfaces/ApiResponseCollection';
import {PaginationButtons} from '@shared/pagination-buttons/pagination-buttons';


@Component({
  selector: 'app-ownable-list',
  imports: [
    OwnableCardComponent,
    OwnableSearcherComponent,
    RouterLink,
    PaginationButtons,
  ],
  templateUrl: './ownable-list-component.html',
  standalone: true,
  styleUrl: './ownable-list-component.scss'
})
export class OwnableListComponent implements OnInit {
  readonly data = input.required<IOwnable[]>();
  readonly pagination = input<Pagination>();

  readonly entity = input.required<Pagables>();
  readonly route = input.required<payableEntity>();
  readonly option = input.required<boolean>();
  readonly personId= input<number>(0);

  changePage = output<number>();
  selected = output<IOwnable>();

  ownableList = signal<IOwnable[]>([]);
  paginationData = signal<Pagination | undefined>(undefined);

  constructor() {
    effect(() => {
      this.data();
      this.ownableList.set(this.data());
    });

  }

  ngOnInit() {
    this.ownableList.set(this.data());
    this.paginationData.set(this.pagination()!);
  }


  handleResults(results: IOwnable[]) {
    this.ownableList.set(results);
  }
}
