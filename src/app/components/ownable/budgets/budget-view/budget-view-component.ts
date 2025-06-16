import {Component, effect, inject, input, signal} from '@angular/core';
import {PersonListComponent} from "@components/people/person-list/person-list-component";
import {OwnableListComponent} from '@components/ownable/ownable-list/ownable-list-component';
import {BudgetFormComponent} from '@components/ownable/budgets/budget-form/budget-form-component';
import {ClientService} from '@services/http/client-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {BudgetService} from '@services/http/budget-service';

@Component({
  selector: 'app-budget-view',
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
  owner = signal<number>(0);
  clientPage = signal(1);
  budgetPage = signal(1);
  budgetsResource = rxResource({
    params: ()=>{
      return{ page: this.budgetPage()}
    },
    stream :({params}) => {
      return this.service.getAll(params.page);
    }
  })

  clientsResource = rxResource({
    params: () =>{return{page : this.clientPage()}},
    stream :({params}) => {
      return this.clientService.getAll(params.page);
    }
  })
  constructor() {
    effect(() => {
      this.owner.set(this.clientId());
    });
  }
}
