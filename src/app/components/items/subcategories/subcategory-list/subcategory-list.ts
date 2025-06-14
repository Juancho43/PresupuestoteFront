import {Component, input, OnInit, output, signal} from '@angular/core';
import {Subcategory} from '@models/subcategory';
import {SubcategoryCardComponent} from '@components/items/subcategories/subcategory-card/subcategory-card';
import {SubcategorySearcherComponent} from '@components/items/subcategories/subcategory-searcher/subcategory-searcher';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Pagination} from '@core/interfaces/ApiResponseCollection';
import {Material} from '@models/material';
import {PaginationButtons} from '@shared/pagination-buttons/pagination-buttons';

@Component({
  selector: 'app-subcategory-list',
  imports: [SubcategoryCardComponent, SubcategorySearcherComponent, CommonModule, RouterLink, PaginationButtons],
  templateUrl: './subcategory-list.html',
  standalone: true,
  styleUrl: './subcategory-list.scss'
})
export class SubcategoryListComponent implements OnInit {
  readonly data = input<Subcategory[]>([]);
  readonly pagination = input<Pagination>({} as Pagination);

  readonly entity = signal<string>('sub-rubro');
  readonly route = signal<string>('material');
  readonly action = signal<string>('subcategory');
  readonly option = input<boolean>(false);
  subcategoryList = signal<Subcategory[]>([]);
  paginationData = signal<Pagination>({} as Pagination);

  selectedSubcategory = output<Subcategory>();
  pageChange = output<number>();

  ngOnInit() {
    this.subcategoryList.set(this.data());
    this.paginationData.set(this.pagination());
  }

  handleResults(results: Subcategory[]) {
    if(results.length > 0) this.subcategoryList.set(results);
    if(results.length === 0) this.subcategoryList.set(this.data());
  }
}
