import {Component, input} from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {Work} from '../../../core/interfaces/Entities/work';

@Component({
  selector: 'app-work',
  imports: [
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent {
  readonly work = input.required<Work>();
}
