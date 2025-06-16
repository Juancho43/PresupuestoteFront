import {Component, inject, input, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {EmployeeService} from '@services/http/employee-service';
import {OwnableListComponent} from '@components/ownable/ownable-list/ownable-list-component';
import {EmployeeComponent} from '../employee/employee.component';
import {PaymentListComponent} from '@components/payments/payment-list/payment-list-component';
import {Pagination} from '@core/interfaces/ApiResponseCollection';
import {PaymentFormComponent} from '@components/payments/payment-form/payment-form-component';
import {IOwnable, Payables} from '@models/IOwnable';
import {Budget} from '@models/budget';
import {Payment} from '@models/payment';

@Component({
  selector: 'app-employee-detail',
  imports: [
    OwnableListComponent,
    EmployeeComponent,
    PaymentListComponent,
    PaymentFormComponent
  ],
  standalone: true,
  templateUrl: './employee-detail-component.html',
  styleUrl: './employee-detail-component.scss'
})
export class EmployeeDetailComponent {
  private service = inject(EmployeeService);
  readonly id = input.required<number>();
  protected readonly Payables = Payables;
  selectedSalary = signal<IOwnable>({} as Budget);
  selectedPayment = signal<Payment>({} as Payment);
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
