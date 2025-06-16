import {Component, inject, input, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {EmployeeService} from '@services/http/employee-service';
import {OwnableListComponent} from '@components/ownable/ownable-list/ownable-list-component';
import {EmployeeComponent} from '../employee/employee.component';
import {PaymentListComponent} from '@components/payments/payment-list/payment-list-component';
import {Pagination} from '@core/interfaces/ApiResponseCollection';

@Component({
  selector: 'app-employee-detail',
  imports: [
    OwnableListComponent,
    EmployeeComponent,
    PaymentListComponent
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
    stream : ({params}) => this.service.getById(params.id),
  })
  pagination = {} as Pagination;
  paymentsPage = signal(1);
  paymentsResource = rxResource({
    params : () => ({id: this.id() || 0, page: this.paymentsPage()}),
    stream : ({params}) => this.service.getPayments(params.id,params.page),
  });
}
