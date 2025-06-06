import {Component, inject, input} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {EmployeeService} from '@services/http/employee-service';
import {PaymentsTableComponent} from '@shared/payments-table-component/payments-table-component';
import {OwnableListComponent} from '@components/ownable/ownable-list-component/ownable-list-component';
import {EmployeeComponent} from '../employee/employee.component';

@Component({
  selector: 'app-employee-detail-component',
  imports: [
    PaymentsTableComponent,
    OwnableListComponent,
    EmployeeComponent
  ],
  standalone: true,
  templateUrl: './employee-detail-component.html',
  styleUrl: './employee-detail-component.scss'
})
export class EmployeeDetailComponent {
  private service = inject(EmployeeService);
  readonly id = input.required<number>();

  employeeResource = rxResource({
    params : () => ({id: this.id() || 0}),
    stream : (params) => this.service.getById(params.params.id),
  })

  paymentsResource = rxResource({
    params : () => ({id: this.id() || 0}),
    stream : () => this.service.getPayments(this.id()),
  });
}
