import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Work} from '../../interfaces/Entities/work';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {workEndpoint} from '../endpoints/works.endpoint';


@Injectable({
  providedIn: 'root'
})
export class WorkService implements ICrudeable<Work> {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Work>> {
    return this.http.get<ApiResponseCollection<Work>>(environment.apiUrlV1 + workEndpoint.getAll);
  }
  getById(id: number): Observable<ApiResponse<Work>> {
    return this.http.get<ApiResponse<Work>>(environment.apiUrlV1 + workEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Work): Observable<ApiResponse<Work>> {
    return this.http.post<ApiResponse<Work>>(environment.apiUrlV1 + workEndpoint.create, entity);
  }
  update(entity: Work): Observable<ApiResponse<Work>> {
    return this.http.post<ApiResponse<Work>>(environment.apiUrlV1 + workEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Work>> {
    return this.http.get<ApiResponse<Work>>(environment.apiUrlV1 + workEndpoint.delete.replace(':id', id.toString()));
  }

}
