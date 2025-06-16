import {Component, input} from '@angular/core';
import {Work} from '@models/work';
import {WorkComponent} from '../work/work.component';
import {MaterialListComponent} from '@components/items/materials/material-list/material-list';

@Component({
  selector: 'app-work-detail',
  imports: [
    WorkComponent,
    MaterialListComponent
  ],
  templateUrl: './work-detail-component.html',
  styleUrl: './work-detail-component.scss'
})
export class WorkDetailComponent {
  readonly work = input.required<Work>();
}
