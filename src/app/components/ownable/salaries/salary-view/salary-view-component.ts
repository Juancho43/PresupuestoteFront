import {Component, effect, inject, input, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {SalaryService} from '@services/http/salary-service';
import {EmployeeService} from '@services/http/employee-service';
import {OwnableListComponent} from '@components/ownable/ownable-list/ownable-list-component';
import {PersonListComponent} from '@components/people/person-list/person-list-component';
import {SalaryFormComponent} from '@components/ownable/salaries/salary-form/salary-form-component';

@Component({
  selector: 'app-salary-view',
  imports: [
    OwnableListComponent,
    PersonListComponent,
    SalaryFormComponent
  ],
  templateUrl: './salary-view-component.html',
  styleUrl: './salary-view-component.scss'
})
export class SalaryViewComponent {
  private service = inject(SalaryService);
  private employeeService = inject(EmployeeService);
  readonly employeeId = input<number>(0);
  readonly id = input(0);
  owner = signal<number>(0);
  employeePage = signal(1);
  salaryPage = signal(1);
  salariesResource = rxResource({
    params: ()=>{
      return{ page: this.salaryPage()}
    },
    stream :({params}) => {
      return this.service.getAll(params.page);
    }
  })

  employeeResource = rxResource({
    params: () =>{return{page : this.employeePage()}},
    stream :({params}) => {
      return this.employeeService.getAll(params.page);
    }
  })
  constructor() {
    effect(() => {
      this.owner.set(this.employeeId());
    });
  }
}
