import {Component, effect, inject, input, OnInit, output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClientService} from '../../../core/services/http/client-service';
import {Client} from '../../../core/interfaces/Entities/client';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {ApiResponse} from '../../../core/interfaces/ApiResponse';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './client-form-component.html',
  styleUrl: './client-form-component.scss'
})
export class ClientFormComponent implements OnInit {
  private clientService = inject(ClientService);
  readonly id = input<number>(0)
  submitted = output<boolean>();

  //Properties
  clientResource = rxResource({
    params:() => ({id: this.id()}),
    stream: ({params}) => {
      if( params.id > 0) return  this.clientService.getById(this.id());
      return of({} as ApiResponse<Client>);
    }
  })
  isEdit = signal(false);

  //Form
  clientForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', Validators.required),
    direction: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.email]),
    dni: new FormControl('', [
      Validators.maxLength(10),
      Validators.minLength(7),
    ]),
    cuit: new FormControl('', [
      Validators.maxLength(13),
      Validators.minLength(10),
    ]),
  });

  constructor() {
    effect(() => {
      this.clientResource.value();
      this.onEditHandler();
    });
  }


  ngOnInit(): void {
    this.setUp();
  }

  setUp() {
    this.closeModal();
    this.clientForm.reset();
    this.isEdit.set(false);
  }

  get canSubmit() {
    let flag: boolean = false;
    if (
      this.clientForm.get('name')?.valid &&
      this.clientForm.get('lastName')?.valid &&
      this.clientForm.get('direction')?.valid &&
      this.clientForm.get('phoneNumber')?.valid
    ) {
      flag = true;
    }
    return flag;
  }

  resetForm($Event: Event) {
    this.setUp();
    $Event.preventDefault();
  }

  onEditHandler() {
    if(this.id()>0){
      this.isEdit.set(true);
      if(!this.clientResource.isLoading()) this.setForm(this.clientResource.value()!.data!)

    }
  }

  onSubmit() {
    if (!this.isEdit()) {
      this.clientService.create(this.toClient()).subscribe()
      this.submitted.emit(true);
    } else {
      let client = this.toClient();
      client.id = this.clientResource.value()?.data?.id;
      client.person.id = this.clientResource.value()?.data?.person?.id;
      this.clientService.update(client).subscribe()
    }
    this.setUp();
  }

  closeModal() {
    // if (this.router.url == '/budget/new/' + this.clientId) {
    //   // this.modalService.closeModal();
    // }
  }

  setForm(data: Client) {
    this.clientForm.patchValue({

      name: data.person.name,
      lastName: data.person.last_name,
      direction: data.person.address,
      phoneNumber: data.person.phone_number,
      mail: data.person.mail,
      dni: data.person.dni,
      cuit: data.person.cuit,
    });
  }

  toClient() : Client{
    return{
      person: {
        name : this.clientForm.get('name')?.value,
        last_name : this.clientForm.get('lastName')?.value,
        address : this.clientForm.get('direction')?.value,
        phone_number : this.clientForm.get('phoneNumber')?.value,
        mail : this.clientForm.get('mail')?.value,
        dni : this.clientForm.get('dni')?.value,
        cuit : this.clientForm.get('cuit')?.value,
      }
    }
  }

}
