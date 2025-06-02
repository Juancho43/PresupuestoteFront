import {Component, input} from '@angular/core';
import {IPerson} from '../../../core/interfaces/Entities/IPerson';
import {TitleCasePipe} from '@angular/common';

@Component({
    selector: 'app-person-card-component',
    imports: [
        TitleCasePipe
    ],
    templateUrl: './i-person-card.component.html',
    standalone: true,
    styleUrl: './i-person-card.component.scss'
})
export class IPersonCardComponent {
  readonly person = input<IPerson>();
}
