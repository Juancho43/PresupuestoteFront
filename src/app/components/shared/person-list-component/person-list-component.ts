import {Component, effect, input, OnInit, signal} from '@angular/core';
import {IPerson} from '../../../core/interfaces/Entities/IPerson';
import {IPersonCardComponent} from '../person-card-component/i-person-card.component';
import {SearcherComponent} from '../searcher-component/searcher-component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-person-list-component',
  imports: [
    IPersonCardComponent,
    SearcherComponent,
    CommonModule,
  ],
  templateUrl: './person-list-component.html',
  standalone: true,
  styleUrl: './person-list-component.scss'
})
export class PersonListComponent implements OnInit {
  readonly data = input.required<IPerson[]>();
  readonly entity = input.required<string>();
  readonly route = input.required<string>();
  readonly action = input.required<string>();
  readonly personList = signal<IPerson[]>([]);

  ngOnInit() {
    this.personList.set(this.data());
  }
  handleResults(results: IPerson[]) {
    if(results.length > 0) this.personList.set(results);
    if(results.length == 0) this.personList.set(this.data());
  }
}
