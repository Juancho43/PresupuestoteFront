import {Component, input} from '@angular/core';
import {IPerson} from '../../../core/interfaces/Entities/IPerson';
import {IPersonCardComponent} from '../card-component/i-person-card.component';

@Component({
  selector: 'app-person-list-component',
  imports: [
    IPersonCardComponent
  ],
  templateUrl: './person-list-component.html',
  styleUrl: './person-list-component.scss'
})
export class PersonListComponent {
  readonly data = input.required<IPerson[]>();
}
