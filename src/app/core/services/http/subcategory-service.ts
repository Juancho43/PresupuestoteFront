import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Subcategory} from '../../interfaces/Entities/subcategory';
import {Observable } from 'rxjs';
import {ApiResponse } from '../../interfaces/ApiResponse';
import {ApiResponseCollection } from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {subcategoryEndpoint} from '../endpoints/subcategories.endpoint';



@Injectable({
  providedIn: 'root'
})
export class SubcategoryService implements ICrudeable<Subcategory> {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Subcategory>> {
    return this.http.get<ApiResponseCollection<Subcategory>>(environment.apiUrlV1 + subcategoryEndpoint.getAll);
  }
  getById(id: number): Observable<ApiResponse<Subcategory>> {
    return this.http.get<ApiResponse<Subcategory>>(environment.apiUrlV1 + subcategoryEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Subcategory): Observable<ApiResponse<Subcategory>> {
    return this.http.post<ApiResponse<Subcategory>>(environment.apiUrlV1 + subcategoryEndpoint.create, entity);
  }
  update(entity: Subcategory): Observable<ApiResponse<Subcategory>> {
    return this.http.post<ApiResponse<Subcategory>>(environment.apiUrlV1 + subcategoryEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Subcategory>> {
    return this.http.get<ApiResponse<Subcategory>>(environment.apiUrlV1 + subcategoryEndpoint.delete.replace(':id', id.toString()));
  }

}
