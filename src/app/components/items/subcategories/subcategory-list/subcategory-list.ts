import {Component, input, OnInit, signal} from '@angular/core';
import {Subcategory} from '@models/subcategory';
import {SubcategoryCardComponent} from '@components/items/subcategories/subcategory-card/subcategory-card';
import {SubcategorySearcherComponent} from '@components/items/subcategories/subcategory-searcher/subcategory-searcher';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-subcategory-list',
  imports: [SubcategoryCardComponent, SubcategorySearcherComponent, CommonModule, RouterLink],
  templateUrl: './subcategory-list.html',
  standalone: true,
  styleUrl: './subcategory-list.scss'
})
export class SubcategoryListComponent implements OnInit {
  readonly data = input<Subcategory[]>([]);
  readonly entity = signal<string>('sub-rubro');
  readonly route = signal<string>('subcategory');
  readonly action = signal<string>('subcategory');
  readonly option = input<boolean>(false);
  subcategoryList = signal<Subcategory[]>([]);

  ngOnInit() {
    this.subcategoryList.set(this.data());
  }

  handleResults(results: Subcategory[]) {
    if(results.length > 0) this.subcategoryList.set(results);
    if(results.length === 0) this.subcategoryList.set(this.data());
  }
}
