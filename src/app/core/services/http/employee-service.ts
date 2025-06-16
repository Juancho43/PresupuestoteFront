import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Employee} from '@models/employee';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {employeeEndpoint} from '../endpoints/employees.endpoint';
import {Payment} from '@models/payment';
import {paymentEndpoint} from '../endpoints/payments.endpoint';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements ICrudeable<Employee> {
  private http = inject(HttpClient);

  getAll(page: number = 1): Observable<ApiResponseCollection<Employee>> {
    return this.http.get<ApiResponseCollection<Employee>>(
      `${environment.apiUrlV1}${employeeEndpoint.paginate}${page}`
    );
  }
  getById(id: number): Observable<ApiResponse<Employee>> {
    return this.http.get<ApiResponse<Employee>>(environment.apiUrlV1 + employeeEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Employee): Observable<ApiResponse<Employee>> {
    return this.http.post<ApiResponse<Employee>>(environment.apiUrlV1 + employeeEndpoint.create, entity);
  }
  update(entity: Employee): Observable<ApiResponse<Employee>> {
    return this.http.put<ApiResponse<Employee>>(environment.apiUrlV1 + employeeEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Employee>> {
    return this.http.delete<ApiResponse<Employee>>(environment.apiUrlV1 + employeeEndpoint.delete.replace(':id', id.toString()));
  }
  getPayments(id: number): Observable<ApiResponseCollection<Payment>> {
    return this.http.get<ApiResponseCollection<Payment>>(environment.apiUrlV1 + paymentEndpoint.byEmployee.replace(':id', id.toString()));
  }

}
