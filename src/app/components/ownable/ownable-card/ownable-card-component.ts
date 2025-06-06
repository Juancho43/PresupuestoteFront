import {Component, input} from '@angular/core';
import {CardButtonComponent} from "../../shared/card-button-component/card-button-component";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {IOwnable} from '../../../core/interfaces/entities/IOwnable';

@Component({
  selector: 'app-ownable-card',
  imports: [
    CommonModule,
    CardButtonComponent,
    CurrencyPipe
  ],
  templateUrl: './ownable-card-component.html',
  standalone: true,
  styleUrl: './ownable-card-component.scss'
})
export class OwnableCardComponent {
  readonly thing = input.required<IOwnable>();
  readonly entity = input.required<string>();
  readonly route = input.required<string>();
}
