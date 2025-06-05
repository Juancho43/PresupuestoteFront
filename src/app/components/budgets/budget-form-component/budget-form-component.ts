import {Component, inject, input, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BudgetService} from '../../../core/services/http/budget-service';
import {ClientService} from '../../../core/services/http/client-service';
import {ClientJoinComponent} from '../../clients/client-join-component/client-join-component';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {Client} from '../../../core/interfaces/Entities/client';
import {ApiResponse} from '../../../core/interfaces/ApiResponse';
import {Person} from '../../../core/interfaces/Entities/person';

@Component({
  selector: 'app-budget-form-component',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './budget-form-component.html',
  styleUrl: './budget-form-component.scss'
})
export class BudgetFormComponent {
  private budgetService = inject(BudgetService);
  private clientService = inject(ClientService);

  clientId = input<number>(0);
  isEdit= signal(false);
  clientResource = rxResource({
    params : () => { return {id: this.clientId()}},
    stream : ({params}) => {
      if(params.id > 0)  return this.clientService.getById(params.id);
      return  of({data: {client: {id: 0}}} as unknown as ApiResponse<Client>);
    }
  });
//Utils
//   private readonly _adapter =
//     inject<DateAdapter<unknown, unknown>>(DateAdapter);
//   private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  // private modalService = inject(ModalService);
  // private clientController = inject(ClientControllerService);
  // private budgetController = inject(BudgetControllerService);
  //Properties
  // currentBudget: any = this.budgetController.getEmptyBudgetRequest();
  // currentClient: Client = this.clientController.getEmptyClient();
  budgetId: number = 0;
  // estados: string[] = this.budgetService.getEstados();
  //Form
  BudgetForm: FormGroup = new FormGroup({
    createdDate: new FormControl('', Validators.required),
    deadLine: new FormControl(null),
    description: new FormControl('', Validators.required),
    cost: new FormControl(1000, Validators.required),
    estado: new FormControl('Presupuestado', Validators.required),
    clientId: new FormControl(0, Validators.required),
    client: new FormControl('Seleccionar cliente'),
  });

  ngOnInit() {
    // this.setDateFortmat('es');

    this.activatedRoute.paramMap.subscribe((params) => {
      this.OnEditHandler();
      this.onClientSelectHandler(params);
    });
  }

  /**
   * Formateado de fecha para los input tipo fecha.
   * @param format pais
   */
  // setDateFortmat(format: string) {
  //   this._locale.set(format);
  //   this._adapter.setLocale(this._locale());
  // }

  setUp() {
    this.BudgetForm.reset();
    this.isEdit.set(false);
    // this.currentBudget = this.budgetController.getEmptyBudgetRequest();
  }

  onClientSelectHandler(params: any) {
    // this.currentClient.clientId = Number(params.get('clientId'));
    // if (this.router.url == '/budget/new/' + this.currentClient.clientId) {
    //   this.clientService
    //     .getClientById(this.currentClient.clientId)
    //     .subscribe((res) => {
    //       this.onClientSelected(res);
    //     });
    // }
  }

  OnEditHandler() {
    // this.budgetId = parseInt(this.activatedRoute.snapshot.params['budgetId']);
    // let url = '/budget/edit/' + this.budgetId;
    // if (this.router.url == url) {
    //   this.budgetService.getBudgetById(this.budgetId).subscribe((budget) => {
    //     this.currentBudget = budget.value;
    //
    //     this.onEdit();
    //   });
    // }
  }

  resetForm($Event: Event) {
    this.setUp();
    this.router.navigate(['/budget']);
    $Event.preventDefault();
  }

  openClientForm() {
    // this.modalService.openModal<ClientListComponent, Client>(
    //   ClientListComponent
    // );
  }

  onClientSelected(res: any) {
    let name = res.value.personId.name + ' ' + res.value.personId.lastName;
    this.BudgetForm.patchValue({
      client: name,
      // clientId: this.currentClient.clientId,
    });
  }

  onEdit() {
    // this.isEdit = true;
    // this.BudgetForm.patchValue({
    //   description: this.currentBudget.descriptionBudget,
    //   deadLine: this.currentBudget.deadLine,
    //   createdDate: this.currentBudget.dateCreated,
    //   estado: this.currentBudget.budgetStatus,
    //   clientId: this.currentBudget.clientId.clientId,
    // });

    this.BudgetForm.get('client')?.disabled;
  }
  onSubmit() {
    this.toBudget();
    // if (this.isEdit) {
    //   this.budgetService.putBudget(this.currentBudget).subscribe({
    //     next: () => {
    //       this.budgetController.setReload(true);
    //     },
    //   });
    // } else {
    //   this.budgetService.postBudget(this.currentBudget).subscribe({
    //     next: () => {
    //       this.budgetController.setReload(true);
    //     },
    //   });
    // }
  }

  toBudget() {
    // this.currentBudget.deadLine = this.BudgetForm.get('deadLine')?.value;
    // this.currentBudget.clientId = this.BudgetForm.get('clientId')?.value;
    // this.currentBudget.descriptionBudget =
    //   this.BudgetForm.get('description')?.value;
    // this.currentBudget.dateCreated = this.BudgetForm.get('createdDate')?.value;
    // this.currentBudget.budgetStatus = this.BudgetForm.get('estado')?.value;
  }
}
