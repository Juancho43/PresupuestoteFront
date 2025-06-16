import {Component, input, output} from '@angular/core';
import {IPerson} from '@models/IPerson';
import {TitleCasePipe} from '@angular/common';
import {CardButtonComponent} from '@shared/card-button/card-button-component';

@Component({
    selector: 'app-person-card',
  imports: [
    TitleCasePipe,
    CardButtonComponent
  ],
    templateUrl: './i-person-card.component.html',
    standalone: true,
    styleUrl: './i-person-card.component.scss'
})
export class IPersonCardComponent {
  readonly person = input<IPerson>();
  readonly entity = input.required<string>();
  readonly route = input.required<string>();
  readonly action = input.required<string>();
  delete = output<number>();
}
