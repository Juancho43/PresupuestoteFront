import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-card-button',
    imports: [
        RouterLink,
    ],
    templateUrl: './card-button-component.html',
    standalone: true,
    styleUrl: './card-button-component.scss'
})
export class CardButtonComponent {
  readonly icon = input<string>('')
  readonly link = input<string>('')
  readonly text = input<string>('')
}
