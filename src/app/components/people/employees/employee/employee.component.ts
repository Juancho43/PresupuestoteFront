import {Component, input} from '@angular/core';
import {Employee} from '@models/employee';
import {CurrencyPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-employee',
  imports: [
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  readonly employee = input.required<Employee>();
}
