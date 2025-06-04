import {Component, input} from '@angular/core';
import {IOwnable} from '../../../core/interfaces/Entities/IOwnable';
import {SearcherComponent} from '../searcher-component/searcher-component';
import {OwnableCardComponent} from '../ownable-card-component/ownable-card-component';

@Component({
  selector: 'app-ownable-list-component',
  imports: [
    SearcherComponent,
    OwnableCardComponent
  ],
  templateUrl: './ownable-list-component.html',
  styleUrl: './ownable-list-component.scss'
})
export class OwnableListComponent {
  readonly data = input.required<IOwnable[]>();
  readonly entity = input.required<string>();
}
