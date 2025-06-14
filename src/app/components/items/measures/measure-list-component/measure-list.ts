import {Component, input, OnInit, output, signal} from '@angular/core';
import {Measure} from '@models/measure';

import {MeasureCardComponent} from '@components/items/measures/measure-card-component/measure-card-component';
import {RouterLink} from '@angular/router';
import {MeasureSearchComponent} from '@components/items/measures/measure-search-component/measure-search-component';
import {Pagination} from '@core/interfaces/ApiResponseCollection';
import {Subcategory} from '@models/subcategory';
import {PaginationButtons} from '@shared/pagination-buttons/pagination-buttons';

@Component({
  selector: 'app-measure-list',
  standalone: true,
  imports: [
    MeasureCardComponent,
    RouterLink,
    MeasureSearchComponent,
    PaginationButtons
  ],
  templateUrl: './measure-list.html',
  styleUrl: './measure-list.scss'
})
export class MeasureListComponent implements OnInit {
  readonly data = input<Measure[]>([]);
  readonly pagination = input<Pagination>({} as Pagination);

  readonly entity = signal<string>('medida');
  readonly route = signal<string>('material');
  readonly action = signal<string>('measure');
  readonly option = input<boolean>(false);

  measureList = signal<Measure[]>([]);
  paginationData = signal<Pagination>({} as Pagination);

  selectedMeasure = output<Measure>();
  pageChange = output<number>();

  ngOnInit() {
    this.measureList.set(this.data());
    this.paginationData.set(this.pagination());
  }

  handleResults(results: Measure[]) {
    if(results.length > 0) this.measureList.set(results);
    if(results.length === 0) this.measureList.set(this.data());
  }
}
