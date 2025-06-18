import {Component, effect, inject, input, OnInit, output, signal} from '@angular/core';
import {ConfirmationDialogService} from '@services/utils/confirmation-dialog-service';
import {InvoiceService} from '@services/http/invoice-service';
import {SupplierService} from '@services/http/supplier-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Supplier} from '@models/supplier';
import {Invoice, InvoiceRequest} from '@models/invoice';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-invoice-form',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './invoice-form-component.html',
  styleUrl: './invoice-form-component.scss'
})
export class InvoiceFormComponent implements OnInit {
  private confirmationService = inject(ConfirmationDialogService);
  private service = inject(InvoiceService);
  private supplierService = inject(SupplierService);
  invoiceId = input<number>(0);
  supplierId = input<number>(0);
  submitted = output<boolean>();
  isEdit= signal(false);


  supplierResource = rxResource({
    params : () => { return {id: this.supplierId()}},
    stream : ({params}) => {
      if(params.id > 0)  return this.supplierService.getById(params.id);
      return  of({data: {supplier: {id: 0}}} as unknown as ApiResponse<Supplier>);
    }
  });

  invoiceResource = rxResource({
    params : () => { return {id: this.supplierId()}},
    stream : ({params}) => {
      if(params.id > 0) return this.service.getById(params.id);
      return of({}  as ApiResponse<Invoice>);
    }
  })




  //Form
  InvoiceForm: FormGroup = new FormGroup({
    date: new FormControl('', Validators.required),
    description : new FormControl('', Validators.required),
    supplierId: new FormControl(0, Validators.required),
  });

  ngOnInit() {
    if(this.invoiceId() > 0) this.isEdit.set(true);

  }

  constructor() {
    effect(() => {
      this.supplierResource.value();
      this.onEditHandler();
    });
  }

  onEditHandler() {
    if(this.invoiceId()>0){
      this.isEdit.set(true);
      if(!this.invoiceResource.isLoading()) this.setForm(this.invoiceResource.value()!.data!)

    }
  }
  setForm(data: Invoice) {
    this.InvoiceForm.patchValue({
      date: data.date,
      supplierId: data.owner!.id,
      description: data.description
    });
  }
  setUp() {
    this.InvoiceForm.reset();
    this.isEdit.set(false);
  }

  resetForm($Event: Event) {
    this.setUp();
    $Event.preventDefault();
  }

  onSubmit() {
    if (!this.isEdit()) {
      this.service.create(this.toInvoice()).subscribe()

    } else {
      this.service.update(this.toInvoice()).subscribe()
    }
    this.submitted.emit(true);
    this.setUp();
  }

  toInvoice(): InvoiceRequest {
    return {
      id: this.invoiceId(),
      supplier_id: this.supplierId(),
      description: this.InvoiceForm.get('description')?.value,
      date: this.InvoiceForm.get('date')?.value,
    }
  }

  onDelete() {
    const result = this.confirmationService.openDialog('¿Está seguro de que desea eliminar esta boleta?');
    result.afterClosed().subscribe(result =>{
      if (result) {
        this.service.delete(this.invoiceResource.value()?.data?.id!).subscribe({
          next: () => {
            this.confirmationService.navigateTo('/invoice')
          }
        });
      }
    })
  }


}
