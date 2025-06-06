import {Component, inject, input, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {ApiResponseCollection} from '@core/interfaces/ApiResponseCollection';
import {IOwnable} from '@models/IOwnable';
import {BudgetService} from '@services/http/budget-service';

@Component({
  selector: 'app-ownable-searcher',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './ownable-searcher.component.html',
  styleUrl: './ownable-searcher.component.scss'
})
export class OwnableSearcherComponent {
  private service = inject(BudgetService);
  results = output<IOwnable[]>();
  readonly entity = input.required<string>()
  readonly route = input.required<string>()
  query = signal('');

  searchResource = rxResource({
    params : () => {
      return {query: this.query(), entity: this.route()}
    },
    stream: ({params}) => {
      if(params.query.length > 2) return  this.service.search(params.entity,params.query)
      return of({} as ApiResponseCollection<IOwnable>);
    },
  })

  search() {
    this.searchResource.reload();
  }
  complete() {
    this.results.emit(this.searchResource.value()!.data! || []);
  }
}
