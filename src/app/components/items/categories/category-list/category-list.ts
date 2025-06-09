import {Component, input, OnInit, signal} from '@angular/core';
import {Category} from '@models/category';
import {CategoryCardComponent} from '@components/items/categories/category-card/category-card';
import {CategorySearcherComponent} from '@components/items/categories/category-searcher/category-searcher';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [CategoryCardComponent, CategorySearcherComponent, CommonModule, RouterLink],
  templateUrl: './category-list.html',
  standalone: true,
  styleUrl: './category-list.scss'
})
export class CategoryListComponent implements OnInit {
  readonly data = input<Category[]>([]);
  readonly entity = signal<string>('rubro');
  readonly route = signal<string>('material');
  readonly action = signal<string>('category');
  readonly option = input<boolean>(false);
  categoryList = signal<Category[]>([]);

  ngOnInit() {
    this.categoryList.set(this.data());
  }

  handleResults(results: Category[]) {
    if(results.length > 0) this.categoryList.set(results);
    if(results.length === 0) this.categoryList.set(this.data());
  }
}
