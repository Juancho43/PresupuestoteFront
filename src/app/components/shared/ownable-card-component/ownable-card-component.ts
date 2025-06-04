import {Component, input} from '@angular/core';
import {CardButtonComponent} from "../card-button-component/card-button-component";
import {CurrencyPipe} from "@angular/common";
import {IOwnable} from '../../../core/interfaces/Entities/IOwnable';

@Component({
  selector: 'app-ownable-card-component',
  imports: [
    CardButtonComponent,
    CurrencyPipe
  ],
  templateUrl: './ownable-card-component.html',
  styleUrl: './ownable-card-component.scss'
})
export class OwnableCardComponent {
  readonly thing = input.required<IOwnable>();
  readonly entity = input.required<string>();
  readonly route = input.required<string>();
}
