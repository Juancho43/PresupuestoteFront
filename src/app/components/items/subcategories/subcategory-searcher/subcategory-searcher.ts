import {Component, effect, inject, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {rxResource} from '@angular/core/rxjs-interop';
import {ApiResponseCollection} from '@core/interfaces/ApiResponseCollection';
import {of} from 'rxjs';
import {Subcategory} from '@models/subcategory';
import {SubcategoryService} from '@services/http/subcategory-service';

@Component({
  selector: 'app-subcategory-searcher',
  imports: [FormsModule],
  templateUrl: './subcategory-searcher.html',
  standalone: true,
  styleUrl: './subcategory-searcher.scss'
})
export class SubcategorySearcherComponent {
  readonly service = inject(SubcategoryService);
  results = output<Subcategory[]>();
  readonly entity = signal<string>('subcategory');
  readonly route = signal<string>('subcategory');
  query = signal('');

  searchResource = rxResource({
    params: () => ({
      query: this.query(),
    }),
    stream: ({params}) => {
      if (params.query.length > 2) return this.service.search(params.query);
      return of({} as ApiResponseCollection<Subcategory>);
    },
  });

  constructor() {
    effect(() => {
      this.query().length > 2 ? this.complete() : this.results.emit([]);
    });
  }

  complete() {
    this.results.emit(this.searchResource.value()?.data!.results || []);
  }
}
