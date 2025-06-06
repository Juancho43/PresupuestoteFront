import {Component, input} from '@angular/core';
import {Measure} from '@models/measure';
import {CardButtonComponent} from '@shared/card-button-component/card-button-component';

@Component({
  selector: 'app-measure-card',
  imports: [
    CardButtonComponent
  ],
  templateUrl: './measure-card-component.html',
  styleUrl: './measure-card-component.scss'
})
export class MeasureCardComponent {
  readonly measure = input.required<Measure>();
  readonly route = input.required<string>();
}
