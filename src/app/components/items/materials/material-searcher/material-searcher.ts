import {Component, effect, inject, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {rxResource} from '@angular/core/rxjs-interop';
import {ApiResponseCollection} from '@core/interfaces/ApiResponseCollection';
import {of} from 'rxjs';
import {Material} from '@models/material';
import {MaterialService} from '@services/http/material-service';

@Component({
  selector: 'app-material-searcher',
  imports: [FormsModule],
  templateUrl: './material-searcher.html',
  standalone: true,
  styleUrl: './material-searcher.scss'
})
export class MaterialSearcherComponent {
  readonly service = inject(MaterialService);
  results = output<Material[]>();
  readonly entity = signal<string>('material');
  readonly route = signal<string>('material');
  query = signal('');

  searchResource = rxResource({
    params: () => ({
      query: this.query(),
    }),
    stream: ({params}) => {
     if (params.query.length > 2) return this.service.search(params.query);
      return of({} as ApiResponseCollection<Material>);
    },
  });

  constructor() {
    effect(() => {
      this.query().length > 2 ? this.complete() : this.results.emit([]);
    });
  }

  complete() {
   this.results.emit(this.searchResource.value()?.data!.results! || []);
  }
}
