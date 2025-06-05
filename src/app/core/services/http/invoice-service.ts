import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Invoice} from '../../interfaces/Entities/invoice';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {invoiceEndpoint} from '../endpoints/invoices.endpoint';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService implements ICrudeable<Invoice> {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Invoice>> {
    return this.http.get<ApiResponseCollection<Invoice>>(environment.apiUrlV1 + invoiceEndpoint.getAll);
  }
  getById(id: number): Observable<ApiResponse<Invoice>> {
    return this.http.get<ApiResponse<Invoice>>(environment.apiUrlV1 + invoiceEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Invoice): Observable<ApiResponse<Invoice>> {
    return this.http.post<ApiResponse<Invoice>>(environment.apiUrlV1 + invoiceEndpoint.create, entity);
  }
  update(entity: Invoice): Observable<ApiResponse<Invoice>> {
    return this.http.post<ApiResponse<Invoice>>(environment.apiUrlV1 + invoiceEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Invoice>> {
    return this.http.get<ApiResponse<Invoice>>(environment.apiUrlV1 + invoiceEndpoint.delete.replace(':id', id.toString()));
  }

}
