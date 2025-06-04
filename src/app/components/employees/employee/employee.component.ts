import {Component, input} from '@angular/core';
import {Employee} from '../../../core/interfaces/Entities/employee';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  readonly employee = input.required<Employee>();
}
