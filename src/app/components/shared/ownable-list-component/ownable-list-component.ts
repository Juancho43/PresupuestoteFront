import {Component, input} from '@angular/core';
import {IOwnable} from '../../../core/interfaces/Entities/IOwnable';
import {OwnableCardComponent} from '../ownable-card-component/ownable-card-component';

@Component({
  selector: 'app-ownable-list-component',
  imports: [
    OwnableCardComponent
  ],
  templateUrl: './ownable-list-component.html',
  standalone: true,
  styleUrl: './ownable-list-component.scss'
})
export class OwnableListComponent {
  readonly data = input.required<IOwnable[]>();
  readonly entity = input.required<string>();
  readonly route = input.required<string>();
}
