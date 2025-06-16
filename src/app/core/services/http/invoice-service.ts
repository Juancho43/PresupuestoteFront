import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Invoice, InvoiceRequest} from '@models/invoice';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {invoiceEndpoint} from '../endpoints/invoices.endpoint';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService implements ICrudeable<Invoice,InvoiceRequest> {
  private http = inject(HttpClient);

  getAll(page: number = 1): Observable<ApiResponseCollection<Invoice>> {
    return this.http.get<ApiResponseCollection<Invoice>>(
      `${environment.apiUrlV1}${invoiceEndpoint.paginate}${page}`
    );
  }
  getById(id: number): Observable<ApiResponse<Invoice>> {
    return this.http.get<ApiResponse<Invoice>>(environment.apiUrlV1 + invoiceEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: InvoiceRequest): Observable<ApiResponse<Invoice>> {
    return this.http.post<ApiResponse<Invoice>>(environment.apiUrlV1 + invoiceEndpoint.create, entity);
  }
  update(entity: InvoiceRequest): Observable<ApiResponse<Invoice>> {
    return this.http.put<ApiResponse<Invoice>>(environment.apiUrlV1 + invoiceEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Invoice>> {
    return this.http.delete<ApiResponse<Invoice>>(environment.apiUrlV1 + invoiceEndpoint.delete.replace(':id', id.toString()));
  }

}
