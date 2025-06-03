import {Component, input} from '@angular/core';
import {IPerson} from '../../../core/interfaces/Entities/IPerson';
import {TitleCasePipe} from '@angular/common';
import {CardButtonComponent} from '../card-button-component/card-button-component';
import {IOwnable} from '../../../core/interfaces/Entities/IOwnable';

@Component({
    selector: 'app-person-card-component',
  imports: [
    TitleCasePipe,
    CardButtonComponent
  ],
    templateUrl: './i-person-card.component.html',
    standalone: true,
    styleUrl: './i-person-card.component.scss'
})
export class IPersonCardComponent {
  readonly person = input<IPerson<IOwnable>>();
  readonly entity = input.required<string>();
}
