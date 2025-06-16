import {Component, effect, inject, input, output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {IOwnable, Payables} from '@models/IOwnable';
import {PaymentService} from '@services/http/payment-service';
import {Payment} from '@models/payment';
import {ConfirmationDialogService} from '@services/utils/confirmation-dialog-service';

@Component({
  selector: 'app-payment-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './payment-form-component.html',
  styleUrl: './payment-form-component.scss'
})
export class PaymentFormComponent {
  private confirmationService = inject(ConfirmationDialogService);
  private service = inject(PaymentService);
  readonly payable = input.required<'boleta'| 'salario' | 'presupuesto'>();
  readonly ownable = input.required<IOwnable>();
  readonly payment = input.required<Payment>();
  paybleType = input.required<Payables>();
  submitted = output();

  isEdit = signal(false);

  //Form
  paymentForm : FormGroup = new FormGroup({
    date: new FormControl('',[ Validators.required]),
    amount: new FormControl(0, Validators.required),
    description : new FormControl('',Validators.required),
    payable_id: new FormControl(0, Validators.required),
    payable_type: new FormControl('', Validators.required)
  });

  constructor() {
    effect(() => {
      this.payment();
      this.onEditHandler();
    });
  }

  onEditHandler() {
    if(this.payment().id! > 0){
      this.isEdit.set(true);
      this.setForm(this.payment());

    }
  }

  setForm(payment: Payment){
    this.paymentForm.get('date')?.setValue(payment.date);
    this.paymentForm.get('amount')?.setValue(payment.amount);
    this.paymentForm.get('description')?.setValue(payment.description);
    this.paymentForm.get('payable_id')?.setValue(this.ownable().id!);
    this.paymentForm.get('payable_type')?.setValue(this.paybleType());
  }

  get canSubmit(){
    let  flag : boolean = false;
    if(
      this.paymentForm.get('date')?.valid &&
      this.paymentForm.get('amount')?.valid &&
      this.paymentForm.get('description')?.valid
    ){
      flag = true;
    }
    return flag;
  }

  setUp(){
    this.paymentForm.reset();
    this.isEdit.set(false);
  }

  resetForm($Event : Event){
    this.setUp();
    $Event.preventDefault();
  }

  onSubmit(){

    if(!this.isEdit()){
      this.service.create(this.toPayment()).subscribe();
    }else{
      this.service.update(this.toPayment()).subscribe();
    }
    this.submitted.emit();
    this.setUp();
  }

  toPayment() :Payment{
    return {
      id: this.payment().id ?? undefined,
      date: this.paymentForm.get('date')?.value,
      amount: this.paymentForm.get('amount')?.value,
      description: this.paymentForm.get('description')?.value,
      payable_id: this.ownable().id! ?? this.payment().payable_id,
      payable_type: this.paybleType(),
    }
  }
  onDelete() {
    const result = this.confirmationService.openDialog('¿Está seguro de que desea eliminar este pago?');
    result.afterClosed().subscribe(result =>{
      if (result) {
        this.service.delete(this.payment().id!).subscribe();
      }
    })
  }

}
