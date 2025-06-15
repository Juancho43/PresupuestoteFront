import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Subcategory, SubCategoryRequest} from '@models/subcategory';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {subcategoryEndpoint} from '../endpoints/subcategories.endpoint';


@Injectable({
  providedIn: 'root'
})
export class SubcategoryService implements ICrudeable<Subcategory,SubCategoryRequest> {
  private http = inject(HttpClient);

  getAll(page: number = 1): Observable<ApiResponseCollection<Subcategory>> {
    return this.http.get<ApiResponseCollection<Subcategory>>(
      `${environment.apiUrlV1}${subcategoryEndpoint.paginate}${page}`
    );
  }
  getById(id: number): Observable<ApiResponse<Subcategory>> {
    return this.http.get<ApiResponse<Subcategory>>(environment.apiUrlV1 + subcategoryEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: SubCategoryRequest): Observable<ApiResponse<Subcategory>> {
    return this.http.post<ApiResponse<Subcategory>>(environment.apiUrlV1 + subcategoryEndpoint.create, entity);
  }
  update(entity: SubCategoryRequest): Observable<ApiResponse<Subcategory>> {
    return this.http.put<ApiResponse<Subcategory>>(environment.apiUrlV1 + subcategoryEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Subcategory>> {
    return this.http.get<ApiResponse<Subcategory>>(environment.apiUrlV1 + subcategoryEndpoint.delete.replace(':id', id.toString()));
  }
  search(query: string): Observable<ApiResponseCollection<Subcategory>> {
    const url = subcategoryEndpoint.search
      .replace(':query', query);
    return this.http.post<ApiResponseCollection<Subcategory>>(environment.apiUrlV1 + url,{});
  }
}
