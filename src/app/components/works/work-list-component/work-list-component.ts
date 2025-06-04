import {Component, input} from '@angular/core';
import {Work} from '../../../core/interfaces/Entities/work';
import {WorkCardComponent} from '../work-card-component/work-card-component';

@Component({
  selector: 'app-work-list',
  imports: [
    WorkCardComponent
  ],
  templateUrl: './work-list-component.html',
  styleUrl: './work-list-component.scss'
})
export class WorkListComponent {
  readonly works = input.required<Work[]>()
  readonly budgetId = input.required<number>();
}
