import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {AddMaterialsToWorkRequest, Work, WorkRequest} from '@models/work';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {workEndpoint} from '../endpoints/works.endpoint';
import {BudgetState} from '@models/budget';


@Injectable({
  providedIn: 'root'
})
export class WorkService implements ICrudeable<Work, WorkRequest> {
  private http = inject(HttpClient);

  getAll(page: number = 1): Observable<ApiResponseCollection<Work>> {
    return this.http.get<ApiResponseCollection<Work>>(
      `${environment.apiUrlV1}${workEndpoint.paginate}${page}`
    );
  }
  getById(id: number): Observable<ApiResponse<Work>> {
    return this.http.get<ApiResponse<Work>>(environment.apiUrlV1 + workEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: WorkRequest): Observable<ApiResponse<Work>> {
    return this.http.post<ApiResponse<Work>>(environment.apiUrlV1 + workEndpoint.create, entity);
  }
  update(entity: WorkRequest): Observable<ApiResponse<Work>> {
    return this.http.put<ApiResponse<Work>>(environment.apiUrlV1 + workEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Work>> {
    return this.http.delete<ApiResponse<Work>>(environment.apiUrlV1 + workEndpoint.delete.replace(':id', id.toString()));
  }
  addMaterial(request : AddMaterialsToWorkRequest): Observable<ApiResponse<Work>> {
    return this.http.post<ApiResponse<Work>>(environment.apiUrlV1 + workEndpoint.addMaterial, request);
  }
  getStates(): Observable<ApiResponse<BudgetState>> {
    return this.http.get<ApiResponse<BudgetState>>(environment.apiUrlV1 + workEndpoint.getStates);
  }
  search(query: string): Observable<ApiResponseCollection<Work>> {
    const url = workEndpoint.search + query;
    return this.http.post<ApiResponseCollection<Work>>(environment.apiUrlV1 + url,{});
  }
}
