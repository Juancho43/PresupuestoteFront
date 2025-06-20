import {Component, effect, inject, output, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {ApiResponseCollection} from '@core/interfaces/ApiResponseCollection';
import {WorkService} from '@services/http/work-service';
import {Work} from '@models/work';

@Component({
  selector: 'app-work-search',
    imports: [
        FormsModule
    ],
  templateUrl: './work-search-component.html',
  styleUrl: './work-search-component.scss'
})
export class WorkSearchComponent {
  readonly service = inject(WorkService);
  results = output<Work[]>();
  readonly entity = signal<string>('trabajo');
  query = signal('');

  searchResource = rxResource({
    params: () => ({
      query: this.query(),
    }),
    stream: ({params}) => {
      if (params.query.length > 2) return this.service.search(params.query);
      return of({} as ApiResponseCollection<Work>);
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
