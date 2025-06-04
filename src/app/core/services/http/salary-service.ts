import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Salary} from '../../interfaces/Entities/salary';
import {Observable } from 'rxjs';
import {ApiResponse } from '../../interfaces/ApiResponse';
import {ApiResponseCollection } from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {salaryEndpoint} from '../endpoints/salarys.endpoint';



@Injectable({
  providedIn: 'root'
})
export class SalaryService implements ICrudeable<Salary> {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Salary>> {
    return this.http.get<ApiResponseCollection<Salary>>(environment.apiUrlV1 + salaryEndpoint.getAll);
  }
  getById(id: number): Observable<ApiResponse<Salary>> {
    return this.http.get<ApiResponse<Salary>>(environment.apiUrlV1 + salaryEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Salary): Observable<ApiResponse<Salary>> {
    return this.http.post<ApiResponse<Salary>>(environment.apiUrlV1 + salaryEndpoint.create, entity);
  }
  update(entity: Salary): Observable<ApiResponse<Salary>> {
    return this.http.post<ApiResponse<Salary>>(environment.apiUrlV1 + salaryEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Salary>> {
    return this.http.get<ApiResponse<Salary>>(environment.apiUrlV1 + salaryEndpoint.delete.replace(':id', id.toString()));
  }

}
