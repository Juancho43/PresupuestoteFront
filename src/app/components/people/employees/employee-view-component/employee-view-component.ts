import {Component, inject, input, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {EmployeeService} from '@services/http/employee-service';
import {PersonListComponent} from '@components/people/person-list-component/person-list-component';
import {EmployeeFormComponent} from '../employee-form-component/employee-form-component';

@Component({
  selector: 'app-employee-view-component',
  imports: [
    EmployeeFormComponent,
    PersonListComponent
  ],
  templateUrl: './employee-view-component.html',
  standalone: true,
  styleUrl: './employee-view-component.scss'
})
export class EmployeeViewComponent {
  private service = inject(EmployeeService);
  readonly id = input(0);
  page = signal(1);
  employeeResource = rxResource({
    params : () => {return{page : this.page()}},
    stream :({params}) => {
      return this.service.getAll(params.page);
    }
  })
  onFormSubmitted() {
    this.employeeResource.reload();
  }

}
