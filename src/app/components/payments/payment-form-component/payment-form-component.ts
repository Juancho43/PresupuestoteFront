import {Component, inject} from '@angular/core';
import {Payment} from '../../../core/interfaces/entities/payment';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-payment-form-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './payment-form-component.html',
  styleUrl: './payment-form-component.scss'
})
export class PaymentFormComponent {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  //Properties
  currentPayment : Payment = {} as Payment;
  paymentId? : number;
  isEdit : boolean = false;
  //Form
  paymentForm : FormGroup = new FormGroup({
    date: new FormControl('',[ Validators.required]),
    amount: new FormControl('', Validators.required),
    description : new FormControl('',Validators.required),
  });

  ngOnInit(): void {
    this.setUp();
    this.onEditHandler();
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
    this.isEdit = false;
    this.currentPayment = {} as Payment;
  }

  resetForm($Event : Event){
    this.setUp();
    this.router.navigate(["/payment"]);
    $Event.preventDefault();
  }

  onEditHandler(){
    this.paymentId = parseInt(this.activatedRoute.snapshot.params['paymentId']);
    if(this.paymentId){
      let url = "/payment/edit/" + this.paymentId;
      if(this.router.url == url){
        this.isEdit = true;
        //this.currentPayment = this.paymentControllerService.getPaymentById(this.paymentId)!;
        this.paymentForm.patchValue(this.currentPayment);
      }else{
        this.isEdit = false;
      }
    }

  }

  onSubmit(){
    this.currentPayment = this.paymentForm.value;
    if(this.isEdit){
      //this.paymentService.handleUpdatePayment(this.currentPayment);
      //this.notificationService.showNotification("pago editado con éxito!");
    }else{
      //this.paymentService.handlePostPayment(this.currentPayment);
      // this.notificationService.showNotification("pago guardado con éxito!");
    }
    this.setUp();
  }
}
