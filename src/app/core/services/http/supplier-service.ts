import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Supplier} from '../../interfaces/Entities/supplier';
import {Observable } from 'rxjs';
import {ApiResponse } from '../../interfaces/ApiResponse';
import {ApiResponseCollection } from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {supplierEndpoint} from '../endpoints/suppliers.endpoint';
import {Payment} from '../../interfaces/Entities/payment';
import {paymentEndpoint} from '../endpoints/payments.endpoint';



@Injectable({
  providedIn: 'root'
})
export class SupplierService implements ICrudeable<Supplier> {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Supplier>> {
    return this.http.get<ApiResponseCollection<Supplier>>(environment.apiUrlV1 + supplierEndpoint.getAll);
  }
  getById(id: number): Observable<ApiResponse<Supplier>> {
    return this.http.get<ApiResponse<Supplier>>(environment.apiUrlV1 + supplierEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Supplier): Observable<ApiResponse<Supplier>> {
    return this.http.post<ApiResponse<Supplier>>(environment.apiUrlV1 + supplierEndpoint.create, entity);
  }
  update(entity: Supplier): Observable<ApiResponse<Supplier>> {
    return this.http.post<ApiResponse<Supplier>>(environment.apiUrlV1 + supplierEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Supplier>> {
    return this.http.get<ApiResponse<Supplier>>(environment.apiUrlV1 + supplierEndpoint.delete.replace(':id', id.toString()));
  }
  getPayments(id: number): Observable<ApiResponseCollection<Payment>> {
    return this.http.get<ApiResponseCollection<Payment>>(environment.apiUrlV1 + paymentEndpoint.bySupplier.replace(':id', id.toString()));
  }

}
