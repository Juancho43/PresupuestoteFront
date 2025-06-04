import {Component, input} from '@angular/core';
import {Work} from '../../../core/interfaces/Entities/work';
import {WorkComponent} from '../work/work.component';

@Component({
  selector: 'app-work-detail',
  imports: [
    WorkComponent
  ],
  templateUrl: './work-detail-component.html',
  styleUrl: './work-detail-component.scss'
})
export class WorkDetailComponent {
  readonly work = input.required<Work>();
}
