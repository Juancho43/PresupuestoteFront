import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Material} from '../../interfaces/entities/material';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {materialEndpoint} from '../endpoints/materials.endpoint';


@Injectable({
  providedIn: 'root'
})
export class MaterialService implements ICrudeable<Material> {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Material>> {
    return this.http.get<ApiResponseCollection<Material>>(environment.apiUrlV1 + materialEndpoint.getAll);
  }
  getById(id: number): Observable<ApiResponse<Material>> {
    return this.http.get<ApiResponse<Material>>(environment.apiUrlV1 + materialEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Material): Observable<ApiResponse<Material>> {
    return this.http.post<ApiResponse<Material>>(environment.apiUrlV1 + materialEndpoint.create, entity);
  }
  update(entity: Material): Observable<ApiResponse<Material>> {
    return this.http.put<ApiResponse<Material>>(environment.apiUrlV1 + materialEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Material>> {
    return this.http.get<ApiResponse<Material>>(environment.apiUrlV1 + materialEndpoint.delete.replace(':id', id.toString()));
  }

}
