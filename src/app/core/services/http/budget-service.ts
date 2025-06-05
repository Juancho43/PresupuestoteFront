import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Budget, BudgetRequest, BudgetState} from '../../interfaces/Entities/budget';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {budgetEndpoint} from '../endpoints/budgets.endpoint';


@Injectable({
  providedIn: 'root'
})
export class BudgetService implements ICrudeable<Budget,BudgetRequest> {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Budget>> {
    return this.http.get<ApiResponseCollection<Budget>>(environment.apiUrlV1 + budgetEndpoint.getAll);
  }
  getById(id: number): Observable<ApiResponse<Budget>> {
    return this.http.get<ApiResponse<Budget>>(environment.apiUrlV1 + budgetEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: BudgetRequest): Observable<ApiResponse<Budget>> {
    return this.http.post<ApiResponse<Budget>>(environment.apiUrlV1 + budgetEndpoint.create, entity);
  }
  update(entity: BudgetRequest): Observable<ApiResponse<Budget>> {
    return this.http.put<ApiResponse<Budget>>(environment.apiUrlV1 + budgetEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Budget>> {
    return this.http.get<ApiResponse<Budget>>(environment.apiUrlV1 + budgetEndpoint.delete.replace(':id', id.toString()));
  }

  getStates(): Observable<ApiResponse<BudgetState>> {
    return this.http.get<ApiResponse<BudgetState>>(environment.apiUrlV1 + budgetEndpoint.getStates);
  }

}
