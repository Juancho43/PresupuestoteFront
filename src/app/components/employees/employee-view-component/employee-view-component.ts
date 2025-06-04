import {Component, inject} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {EmployeeService} from '../../../core/services/http/employee-service';
import {PersonListComponent} from '../../shared/person-list-component/person-list-component';
import {EmployeeFormComponent} from '../employee-form-component/employee-form-component';

@Component({
  selector: 'app-employee-view-component',
  imports: [
    EmployeeFormComponent,
    PersonListComponent
  ],
  templateUrl: './employee-view-component.html',
  styleUrl: './employee-view-component.scss'
})
export class EmployeeViewComponent {
  private service = inject(EmployeeService);
  employeeResource = rxResource({
    stream :() => {
      return this.service.getAll();
    }
  })

}
