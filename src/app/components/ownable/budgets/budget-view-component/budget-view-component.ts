import {Component, inject, input} from '@angular/core';
import {PersonListComponent} from "@components/people/person-list-component/person-list-component";
import {OwnableListComponent} from '@components/ownable/ownable-list-component/ownable-list-component';
import {BudgetFormComponent} from '../budget-form-component/budget-form-component';
import {ClientService} from '@services/http/client-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {BudgetService} from '@services/http/budget-service';

@Component({
  selector: 'app-budget-view-component',
  imports: [
    OwnableListComponent,
    BudgetFormComponent,
    PersonListComponent
  ],
  templateUrl: './budget-view-component.html',
  styleUrl: './budget-view-component.scss'
})
export class BudgetViewComponent {
  private service = inject(BudgetService);
  private clientService = inject(ClientService);
  readonly clientId = input<number>(0);
  readonly id = input(0);

  budgetsResource = rxResource({
    stream :() => {
      return this.service.getAll();
    }
  })

  clientsResource = rxResource({
    stream :() => {
      return this.clientService.getAll();
    }
  })

  onFormSubmitted()
  {
    this.budgetsResource.reload();
  }
}
