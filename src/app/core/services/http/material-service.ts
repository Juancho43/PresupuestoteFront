import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Material} from '@models/material';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {materialEndpoint} from '../endpoints/materials.endpoint';
import {Budget} from '@models/budget';
import {budgetEndpoint} from '@services/endpoints/budgets.endpoint';


@Injectable({
  providedIn: 'root'
})
export class MaterialService implements ICrudeable<Material> {
  private http = inject(HttpClient);

  getAll(page: number = 1): Observable<ApiResponseCollection<Material>> {
    return this.http.get<ApiResponseCollection<Material>>(
      `${environment.apiUrlV1}${materialEndpoint.paginate}${page}`
    );
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
  search(query: string): Observable<ApiResponseCollection<Material>> {
    const url = materialEndpoint.search
      .replace(':query', query);
    return this.http.post<ApiResponseCollection<Material>>(environment.apiUrlV1 + url,{});
  }
  getByIdWithWorks(id: number): Observable<ApiResponse<Material>> {
    return this.http.get<ApiResponse<Material>>(environment.apiUrlV1 + materialEndpoint.works.replace(':id', id.toString()));
  }
  getByIdWithInvoices(id: number): Observable<ApiResponse<Material>> {
    return this.http.get<ApiResponse<Material>>(environment.apiUrlV1 + materialEndpoint.invoices.replace(':id', id.toString()));
  }
  getByIdWithStocks(id: number): Observable<ApiResponse<Material>> {
    return this.http.get<ApiResponse<Material>>(environment.apiUrlV1 + materialEndpoint.stocks.replace(':id', id.toString()));
  }
  getByIdWithPrices(id: number): Observable<ApiResponse<Material>> {
    return this.http.get<ApiResponse<Material>>(environment.apiUrlV1 + materialEndpoint.prices.replace(':id', id.toString()));
  }
}
