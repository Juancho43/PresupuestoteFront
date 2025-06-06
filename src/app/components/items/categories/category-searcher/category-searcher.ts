import {Component, inject, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {rxResource} from '@angular/core/rxjs-interop';
import {ApiResponseCollection} from '@core/interfaces/ApiResponseCollection';
import {of} from 'rxjs';
import {Category} from '@models/category';
import {CategoryService} from '@services/http/category-service';

@Component({
  selector: 'app-category-searcher',
  imports: [FormsModule],
  templateUrl: './category-searcher.html',
  standalone: true,
  styleUrl: './category-searcher.scss'
})
export class CategorySearcherComponent {
  readonly service = inject(CategoryService);
  results = output<Category[]>();
  readonly entity = signal<string>('category');
  readonly route = signal<string>('category');
  query = signal('');

  searchResource = rxResource({
    params: () => ({
      query: this.query(),
      entity: this.route()
    }),
    stream: ({params}) => {
      // if (params.query.length > 2) return this.service.search(params.entity, params.query);
      return of({} as ApiResponseCollection<Category>);
    },
  });

  search() {
    this.searchResource.reload();
  }

  complete() {
    // this.results.emit(this.searchResource.value()?.data || []);
  }
}
