import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {PaymentService} from '@services/http/payment-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {PaymentListComponent} from '@components/payments/payment-list/payment-list-component';
import {Payment} from '@models/payment';
import {IOwnable, Pagables, payableEntity, Payables} from '@models/IOwnable';
import {OwnableListComponent} from '@components/ownable/ownable-list/ownable-list-component';
import {OwnableSelector} from '@components/ownable/ownable-selector/ownable-selector';
import {PaymentFormComponent} from '@components/payments/payment-form/payment-form-component';

@Component({
  selector: 'app-payment-view',
  imports: [
    PaymentListComponent,
    OwnableListComponent,
    OwnableSelector,
    PaymentFormComponent
  ],
  templateUrl: './payment-view-component.html',
  styleUrl: './payment-view-component.scss'
})
export class PaymentViewComponent {
  private service= inject(PaymentService);
  readonly id = input(0);
  selectedPayment = signal<Payment>({} as Payment);
  page = signal(1);
  paymentsReource = rxResource({
    params: () => {return{page:this.page()}},
    stream: ({params}) => this.service.getAll(params.page),

  })



  ownable = signal<IOwnable>({}as IOwnable);
  ownableList = signal<IOwnable[]>([]);

  payable = signal<payableEntity>(payableEntity.Budget);

  pagables = computed(() =>{
    if (this.payable() === payableEntity.Invoice) {
      return Pagables.Boleta;
    }
    if (this.payable() === payableEntity.Budget) {
      return Pagables.Presupuesto;
    }
    return Pagables.Salario;
  });

  paybleType = computed(()=>{
    if (this.payable() === payableEntity.Invoice) {
      return Payables.Invoice;
    }
    if (this.payable() === payableEntity.Budget) {
      return Payables.Budget;
    }
    return Payables.Salary;
  });

  constructor() {
    effect(() => {
      this.payable();
      this.ownable.set({} as IOwnable)
      this.ownableList.set([]);
    });


  }



}
