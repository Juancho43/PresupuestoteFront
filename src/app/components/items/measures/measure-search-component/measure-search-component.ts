import {Component, inject, output, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialService} from '@services/http/material-service';
import {Material} from '@models/material';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {ApiResponseCollection} from '@core/interfaces/ApiResponseCollection';
import {MeasureService} from '@services/http/measure-service';
import {Measure} from '@models/measure';

@Component({
  selector: 'app-measure-searcher',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './measure-search-component.html',
  styleUrl: './measure-search-component.scss'
})
export class MeasureSearchComponent {
  readonly service = inject(MeasureService);
  results = output<Measure[]>();
  readonly entity = signal<string>('medida');
  readonly route = signal<string>('maeasure');
  query = signal('');

  searchResource = rxResource({
    params: () => ({
      query: this.query(),
    }),
    stream: ({params}) => {
      if (params.query.length > 2) return this.service.search(params.query);
      return of({} as ApiResponseCollection<Measure>);
    },
  });

  search() {
    this.searchResource.reload();
  }

  complete() {
    this.results.emit(this.searchResource.value()?.data || []);
  }
}
