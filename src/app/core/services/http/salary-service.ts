import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Salary, SalaryRequest} from '@models/salary';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {salaryEndpoint} from '../endpoints/salaries.endpoint';


@Injectable({
  providedIn: 'root'
})
export class SalaryService implements ICrudeable<Salary,SalaryRequest> {
  private http = inject(HttpClient);

  getAll(page: number = 1): Observable<ApiResponseCollection<Salary>> {
    return this.http.get<ApiResponseCollection<Salary>>(
      `${environment.apiUrlV1}${salaryEndpoint.paginate}${page}`
    );
  }
  getById(id: number): Observable<ApiResponse<Salary>> {
    return this.http.get<ApiResponse<Salary>>(environment.apiUrlV1 + salaryEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: SalaryRequest): Observable<ApiResponse<Salary>> {
    return this.http.post<ApiResponse<Salary>>(environment.apiUrlV1 + salaryEndpoint.create, entity);
  }
  update(entity: SalaryRequest): Observable<ApiResponse<Salary>> {
    return this.http.put<ApiResponse<Salary>>(environment.apiUrlV1 + salaryEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Salary>> {
    return this.http.delete<ApiResponse<Salary>>(environment.apiUrlV1 + salaryEndpoint.delete.replace(':id', id.toString()));
  }

}
