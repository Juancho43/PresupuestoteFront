import {Component, input, OnInit, output, signal} from '@angular/core';
import {Category} from '@models/category';
import {CategoryCardComponent} from '@components/items/categories/category-card/category-card';
import {CategorySearcherComponent} from '@components/items/categories/category-searcher/category-searcher';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Pagination} from '@core/interfaces/ApiResponseCollection';
import {Subcategory} from '@models/subcategory';
import {PaginationButtons} from '@shared/pagination-buttons/pagination-buttons';

@Component({
  selector: 'app-category-list',
  imports: [CategoryCardComponent, CategorySearcherComponent, CommonModule, RouterLink, PaginationButtons],
  templateUrl: './category-list.html',
  standalone: true,
  styleUrl: './category-list.scss'
})
export class CategoryListComponent implements OnInit {
  readonly data = input<Category[]>([]);
  readonly pagination = input<Pagination>({} as Pagination);

  readonly entity = signal<string>('rubro');
  readonly route = signal<string>('material');
  readonly action = signal<string>('category');
  readonly option = input<boolean>(false);
  categoryList = signal<Category[]>([]);

  paginationData = signal<Pagination>({} as Pagination);

  selectedCategory = output<Category>();
  pageChange = output<number>();
  ngOnInit() {
    this.categoryList.set(this.data());
    this.paginationData.set(this.pagination());
  }

  handleResults(results: Category[]) {
    if(results.length > 0) this.categoryList.set(results);
    if(results.length === 0) this.categoryList.set(this.data());
  }
}
