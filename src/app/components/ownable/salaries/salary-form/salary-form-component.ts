import {Component, effect, inject, input, OnInit, output, signal} from '@angular/core';
import {ConfirmationDialogService} from '@services/utils/confirmation-dialog-service';
import {SalaryService} from '@services/http/salary-service';
import {EmployeeService} from '@services/http/employee-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Salary, SalaryRequest} from '@models/salary';
import {Employee} from '@models/employee';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-salary-form',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './salary-form-component.html',
  styleUrl: './salary-form-component.scss'
})
export class SalaryFormComponent implements OnInit {
  private confirmationService = inject(ConfirmationDialogService);
  private service = inject(SalaryService);
  private employeeService = inject(EmployeeService);
  salaryId = input<number>(0);
  employeeId = input<number>(0);
  submitted = output<boolean>();
  isEdit= signal(false);


  employeeResource = rxResource({
    params : () => { return {id: this.employeeId()}},
    stream : ({params}) => {
      if(params.id > 0)  return this.employeeService.getById(params.id);
      return  of({data: {employee: {id: 0}}} as unknown as ApiResponse<Employee>);
    }
  });

  salaryResource = rxResource({
    params : () => { return {id: this.salaryId()}},
    stream : ({params}) => {
      if(params.id > 0) return this.service.getById(params.id);
      return of({}  as ApiResponse<Salary>);
    }
  })




  //Form
  SalaryForm: FormGroup = new FormGroup({
    date: new FormControl('', Validators.required),
    active : new FormControl(true, Validators.required),
    amount : new FormControl(0, Validators.required),
    employeeId: new FormControl(0, Validators.required),
  });

  ngOnInit() {
    if(this.salaryId() > 0) this.isEdit.set(true);

  }

  constructor() {
    effect(() => {
      this.employeeResource.value();
      this.onEditHandler();
    });
  }

  onEditHandler() {
    if(this.salaryId()>0){
      this.isEdit.set(true);
      if(!this.salaryResource.isLoading()) this.setForm(this.salaryResource.value()!.data!)

    }
  }
  setForm(data: Salary) {
    this.SalaryForm.patchValue({
      date: data.date,
      amount: data.total,
      active: data.active,
      supplierId: data.owner!.id
    });
  }
  setUp() {
    this.SalaryForm.reset();
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

  toInvoice(): SalaryRequest {
    return {
      id: this.salaryId(),
      employee_id: this.employeeId(),
      amount: this.SalaryForm.get('amount')?.value,
      active: this.SalaryForm.get('active')?.value,
      date: this.SalaryForm.get('date')?.value,
    }
  }

  onDelete() {
    const result = this.confirmationService.openDialog('¿Está seguro de que desea eliminar este salario?');
    result.afterClosed().subscribe(result =>{
      if (result) {
        this.service.delete(this.salaryResource.value()?.data?.id!).subscribe({
          next: () => {
            this.confirmationService.navigateTo('/salary')
          }
        });
      }
    })
  }

}
