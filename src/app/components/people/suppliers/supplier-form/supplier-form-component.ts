import {Component, effect, inject, input, OnInit, output, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from '@angular/router';
import {ConfirmationDialogService} from '@services/utils/confirmation-dialog-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {SupplierService} from '@services/http/supplier-service';
import {Supplier} from '@models/supplier';

@Component({
    selector: 'app-supplier-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
    templateUrl: './supplier-form-component.html',
    standalone: true,
    styleUrl: './supplier-form-component.scss'
})
export class SupplierFormComponent implements OnInit {
  private service = inject(SupplierService);
  private confirmationService = inject(ConfirmationDialogService);
  readonly id = input<number>(0)
  submitted = output<boolean>();

  //Properties
  supplierResource = rxResource({
    params:() => ({id: this.id()}),
    stream: ({params}) => {
      if( params.id > 0) return  this.service.getById(params.id);
      return of({} as ApiResponse<Supplier>);
    }
  })
  isEdit = signal(false);

  //Form
  supplierForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    direction: new FormControl(''),
    phoneNumber: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.email]),
    notes: new FormControl(''),
    dni: new FormControl('', [
      Validators.maxLength(10),
      Validators.minLength(7),
    ]),
    cuit: new FormControl('', [
      Validators.maxLength(13),
      Validators.minLength(10),
    ]),
  });

  constructor() {
    effect(() => {
      this.supplierResource.value();
      this.onEditHandler();
    });
  }


  ngOnInit(): void {
    this.setUp();
  }

  setUp() {
    this.supplierForm.reset();
    this.isEdit.set(false);
  }

  get canSubmit() {
    let flag: boolean = false;
    if (
      this.supplierForm.get('name')?.valid &&
      this.supplierForm.get('phoneNumber')?.valid
    ) {
      flag = true;
    }
    return flag;
  }



  onEditHandler() {
    if(this.id()>0){
      this.isEdit.set(true);
      if(!this.supplierResource.isLoading()) this.setForm(this.supplierResource.value()!.data!)

    }
  }

  onSubmit() {
    if (!this.isEdit()) {
      this.service.create(this.toSupplier()).subscribe()
    } else {
      this.service.update(this.toSupplier()).subscribe()
    }
    this.submitted.emit(true);
    this.setUp();
  }



  setForm(data: Supplier) {
    this.supplierForm.patchValue({
      name: data.person.name,
      lastName: data.person.last_name,
      direction: data.person.address,
      phoneNumber: data.person.phone_number,
      notes: data.notes,
      mail: data.person.mail,
      dni: data.person.dni,
      cuit: data.person.cuit,
    });
  }

  toSupplier() : Supplier{
    return{
      id: this.id(),
      notes: this.supplierForm.get('notes')?.value,
      person: {
        id: this.supplierResource.value()?.data?.person.id,
        name : this.supplierForm.get('name')?.value,
        last_name : this.supplierForm.get('lastName')?.value,
        address : this.supplierForm.get('direction')?.value,
        phone_number : this.supplierForm.get('phoneNumber')?.value,
        mail : this.supplierForm.get('mail')?.value,
        dni : this.supplierForm.get('dni')?.value,
        cuit : this.supplierForm.get('cuit')?.value,
      }
    }
  }

  onDelete() {
    const result = this.confirmationService.openDialog('¿Está seguro de que desea eliminar este proveedor?');
    result.afterClosed().subscribe(result =>{
      if (result) {
        this.service.delete(this.supplierResource.value()?.data?.id!).subscribe({
          next: () => {
            this.confirmationService.navigateTo('/supplier')
          }
        });
      }
    })
  }
}
