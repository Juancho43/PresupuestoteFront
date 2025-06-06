import {Component, effect, inject, input, OnInit, output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BudgetService} from '@services/http/budget-service';
import {ClientService} from '@services/http/client-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {Client} from '@models/client'
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {Budget, BudgetRequest, BudgetState} from '@models/budget';

@Component({
  selector: 'app-budget-form',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './budget-form-component.html',
  styleUrl: './budget-form-component.scss'
})
export class BudgetFormComponent implements OnInit {
  private budgetService = inject(BudgetService);
  private clientService = inject(ClientService);
  budgetId = input<number>(0);
  clientId = input<number>(0);
  submitted = output<boolean>();
  isEdit= signal(false);

  clientResource = rxResource({
    params : () => { return {id: this.clientId()}},
    stream : ({params}) => {
      if(params.id > 0)  return this.clientService.getById(params.id);
      return  of({data: {client: {id: 0}}} as unknown as ApiResponse<Client>);
    }
  });

  budgetResource = rxResource({
    params : () => { return {id: this.budgetId()}},
    stream : ({params}) => {
      if(params.id > 0) return this.budgetService.getById(params.id);
      return of({}  as ApiResponse<Budget>);
    }
  })

  statesResource = rxResource({
    params : () => { return {call : this.isEdit()}},
    stream : ({params}) =>{
      if(params.call) return this.budgetService.getStates();
      return of({data: {state: []}} as unknown as ApiResponse<BudgetState>)
    }
  });


  //Form
  BudgetForm: FormGroup = new FormGroup({
    createdDate: new FormControl('', Validators.required),
    deadLine: new FormControl(null),
    description: new FormControl('', Validators.required),
    profit: new FormControl(1000, Validators.required),
    state: new FormControl('Presupuestado'),
    clientId: new FormControl(0, Validators.required),
  });

  ngOnInit() {
    if(this.budgetId() > 0) this.isEdit.set(true);

  }

  constructor() {
    effect(() => {
      this.clientResource.value();
      this.onEditHandler();
    });
  }

  onEditHandler() {
    if(this.budgetId()>0){
      this.isEdit.set(true);
      if(!this.budgetResource.isLoading()) this.setForm(this.budgetResource.value()!.data!)

    }
  }
  setForm(data: Budget) {
    this.BudgetForm.patchValue({
      description: data.description,
      deadLine: data.dead_line,
      createdDate: data.made_date,
      profit: data.profit,
      state: data.state,
      clientId: data.client!.id
    });
  }
  setUp() {
    this.BudgetForm.reset();
    this.isEdit.set(false);
  }

  resetForm($Event: Event) {
    this.setUp();
    $Event.preventDefault();
  }

  onSubmit() {
    if (!this.isEdit()) {
      this.budgetService.create(this.toBudget()).subscribe()

    } else {
      this.budgetService.update(this.toBudget()).subscribe()
    }
    this.submitted.emit(true);
    this.setUp();
  }

  toBudget(): BudgetRequest {
    return {
      id: this.budgetId(),
      client_id: this.clientId(),
      description: this.BudgetForm.get('description')?.value,
      made_date: this.BudgetForm.get('createdDate')?.value,
      dead_line: this.BudgetForm.get('deadLine')?.value,
      profit: this.BudgetForm.get('profit')?.value,
      state : this.BudgetForm.get('state')?.value,
    }
  }
}
