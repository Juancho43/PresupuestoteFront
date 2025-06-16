import {Component, input} from '@angular/core';
import {Work} from '@models/work';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {CardButtonComponent} from '@shared/card-button/card-button-component';

@Component({
  selector: 'app-work-card',
  imports: [
    CurrencyPipe,
    DatePipe,
    CardButtonComponent
  ],
  templateUrl: './work-card-component.html',
  styleUrl: './work-card-component.scss'
})
export class WorkCardComponent {
  readonly work = input.required<Work>();
  readonly budgetId = input.required<number>();
}
