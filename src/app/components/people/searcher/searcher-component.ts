import {Component, effect, inject, input, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PeopleService} from '@services/http/people-service';
import {IPerson} from '@models/IPerson';
import {rxResource} from '@angular/core/rxjs-interop';
import {ApiResponseCollection} from '@core/interfaces/ApiResponseCollection';
import {of} from 'rxjs';

@Component({
  selector: 'app-searcher',
  imports: [
    FormsModule
  ],
  templateUrl: './searcher-component.html',
  standalone: true,
  styleUrl: './searcher-component.scss'
})
export class SearcherComponent {
  private peopleService = inject(PeopleService);
  results = output<IPerson[]>();
  readonly entity = input.required<string>()
  readonly route = input.required<string>()
  query = signal('');


  searchResource = rxResource({
    params : () => {
      return {query: this.query(), entity: this.route()}
    },
    stream: ({params}) => {
      if(params.query.length > 2) return  this.peopleService.search(params.entity,params.query)
      return of({} as ApiResponseCollection<IPerson>);
    },
  })

  constructor() {
    effect(() => {
      this.query().length > 2 ? this.complete() : this.results.emit([]);
    });
  }
  complete() {
    this.results.emit(this.searchResource.value()!.data!.results || []);
  }
}
