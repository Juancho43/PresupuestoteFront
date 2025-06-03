import {Component, input} from '@angular/core';
import {IPerson} from '../../../core/interfaces/Entities/IPerson';
import {IPersonCardComponent} from '../person-card-component/i-person-card.component';
import {SearcherComponent} from '../searcher-component/searcher-component';
import {IOwnable} from '../../../core/interfaces/Entities/IOwnable';

@Component({
  selector: 'app-person-list-component',
  imports: [
    IPersonCardComponent,
    SearcherComponent
  ],
  templateUrl: './person-list-component.html',
  standalone: true,
  styleUrl: './person-list-component.scss'
})
export class PersonListComponent {
  readonly data = input.required<IPerson<IOwnable>[]>();
  readonly entity = input.required<string>();
}
