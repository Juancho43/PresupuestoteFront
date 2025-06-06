import {Component, input, OnInit, signal} from '@angular/core';
import {Measure} from '@models/measure';
import {SubcategoryCardComponent} from '@components/items/subcategories/subcategory-card/subcategory-card';
import {SubcategorySearcherComponent} from '@components/items/subcategories/subcategory-searcher/subcategory-searcher';
import {Category} from '@models/category';
import {MeasureCardComponent} from '@components/items/measures/measure-card-component/measure-card-component';
import {RouterLink} from '@angular/router';
import {MeasureSearchComponent} from '@components/items/measures/measure-search-component/measure-search-component';

@Component({
  selector: 'app-measure-list',
  standalone: true,
  imports: [
    MeasureCardComponent,
    RouterLink,
    MeasureSearchComponent
  ],
  templateUrl: './measure-list.html',
  styleUrl: './measure-list.scss'
})
export class MeasureListComponent implements OnInit {
  readonly data = input<Measure[]>([]);
  readonly entity = signal<string>('medida');
  readonly route = signal<string>('measure');
  readonly action = signal<string>('measure');
  readonly option = input<boolean>(false);
  measureList = signal<Measure[]>([]);

  ngOnInit() {
    this.measureList.set(this.data());
  }

  handleResults(results: Measure[]) {
    if(results.length > 0) this.measureList.set(results);
    if(results.length === 0) this.measureList.set(this.data());
  }
}
