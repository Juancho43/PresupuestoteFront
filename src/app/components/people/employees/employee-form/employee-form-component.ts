import {Component, effect, inject, input, output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {EmployeeService} from '@services/http/employee-service';
import {ConfirmationDialogService} from '@services/utils/confirmation-dialog-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {Employee} from '@models/employee';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-employee-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    DatePipe
  ],
    templateUrl: './employee-form-component.html',
    standalone: true,
    styleUrl: './employee-form-component.scss'
})
export class EmployeeFormComponent {
  private service = inject(EmployeeService);
  private confirmationService = inject(ConfirmationDialogService);
  readonly id = input<number>(0)
  submitted = output<boolean>();

  employeeResource = rxResource({
    params:() => ({id: this.id()}),
    stream: ({params}) => {
      if( params.id > 0) return  this.service.getById(params.id);
      return of({} as ApiResponse<Employee>);
    }
  })
  isEdit = signal(false);
  //Form
  employeeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    direction: new FormControl(''),
    phoneNumber: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.email]),
    dni: new FormControl('', [
      Validators.maxLength(10),
      Validators.minLength(7),
    ]),
    cuit: new FormControl('', [
      Validators.maxLength(13),
      Validators.minLength(10),
    ]),
    salary : new FormControl(0),
    is_active: new FormControl(false),
    start_date: new FormControl('', Validators.required),
    end_date: new FormControl(),

  });


  constructor() {
    effect(() => {
      this.employeeResource.value();
      this.onEditHandler();
    });
  }


  ngOnInit(): void {
    this.setUp();
  }

  setUp() {
    this.employeeForm.reset();
    this.isEdit.set(false);
  }

  get canSubmit() {
    let flag: boolean = false;
    if (
      this.employeeForm.get('name')?.valid &&
      this.employeeForm.get('phoneNumber')?.valid
    ) {
      flag = true;
    }
    return flag;
  }



  onEditHandler() {
    if(this.id()>0){
      this.isEdit.set(true);
      if(!this.employeeResource.isLoading()) this.setForm(this.employeeResource.value()!.data!)

    }
  }

  onSubmit() {
    console.log(this.isEdit());
    if (!this.isEdit()) {
      this.service.create(this.toEmployee()).subscribe()
    } else {
      this.service.update(this.toEmployee()).subscribe()
    }
    this.submitted.emit(true);
    this.setUp();
  }



  setForm(data: Employee) {
    this.employeeForm.patchValue({
      name: data.person.name,
      lastName: data.person.last_name,
      direction: data.person.address,
      phoneNumber: data.person.phone_number,
      mail: data.person.mail,
      dni: data.person.dni,
      cuit: data.person.cuit,
      salary: data.salary,
      is_active: data.is_active,
      start_date: data.start_date ,
      end_date: data.end_date ,
    });
  }

  toEmployee() : Employee {
    return {
      id: this.id(),
      person: {
        id: this.employeeResource.value()?.data?.person?.id,
        name: this.employeeForm.get('name')?.value,
        last_name: this.employeeForm.get('lastName')?.value,
        address: this.employeeForm.get('direction')?.value,
        phone_number: this.employeeForm.get('phoneNumber')?.value,
        mail: this.employeeForm.get('mail')?.value,
        dni: this.employeeForm.get('dni')?.value,
        cuit: this.employeeForm.get('cuit')?.value,
      },
      is_active: this.employeeForm.get('is_active')?.value,
      salary: this.employeeForm.get('salary')?.value,
      start_date: this.employeeForm.get('start_date')?.value,
      end_date: this.employeeForm.get('end_date')?.value ,


    }
  }

  onDelete() {
    const result = this.confirmationService.openDialog('¿Está seguro de que desea eliminar este empleado?');
    result.afterClosed().subscribe(result =>{
      if (result) {
        this.service.delete(this.employeeResource.value()?.data?.id!).subscribe({
          next: () => {
            this.confirmationService.navigateTo('/employee')
          }
        });
      }
    })
  }

}
