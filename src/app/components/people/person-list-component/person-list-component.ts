import {Component, input, OnInit, signal} from '@angular/core';
import {IPerson} from '@models/IPerson';
import {IPersonCardComponent} from '@components/people/person-card-component/i-person-card.component';
import {SearcherComponent} from '@components/people/searcher-component/searcher-component';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-person-list-component',
  imports: [
    IPersonCardComponent,
    SearcherComponent,
    CommonModule,
    RouterLink,
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
  readonly option = input.required<boolean>();
  personList = signal<IPerson[]>([]);

  ngOnInit() {
    this.personList.set(this.data());
  }
  handleResults(results: IPerson[]) {
    if(results.length > 0) this.personList.set(results);
    if(results.length == 0) this.personList.set(this.data());
  }
}
