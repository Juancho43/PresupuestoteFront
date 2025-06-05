import {Component, input} from '@angular/core';
import {Work} from '../../../core/interfaces/Entities/work';
import {WorkCardComponent} from '../work-card-component/work-card-component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-work-list',
  imports: [
    WorkCardComponent,
    RouterLink
  ],
  templateUrl: './work-list-component.html',
  styleUrl: './work-list-component.scss'
})
export class WorkListComponent {
  readonly works = input.required<Work[]>()
  readonly budgetId = input.required<number>();
}
