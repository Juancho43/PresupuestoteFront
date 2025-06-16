import {Component, inject, input, signal} from '@angular/core';
import {SupplierFormComponent} from '@components/people/suppliers/supplier-form/supplier-form-component';
import {PersonListComponent} from "@components/people/person-list-component/person-list-component";
import {rxResource} from '@angular/core/rxjs-interop';
import {SupplierService} from '@services/http/supplier-service';

@Component({
  selector: 'app-supplier-view-component',
  imports: [
    SupplierFormComponent,
    PersonListComponent
  ],
  templateUrl: './supplier-view-component.html',
  standalone: true,
  styleUrl: './supplier-view-component.scss'
})
export class SupplierViewComponent {
  private service = inject(SupplierService);
  readonly id = input(0);
  page = signal(1);

  supplierResource = rxResource({
    params : () => {return{page : this.page()}},
    stream :({params}) => {
      return this.service.getAll(params.page);
    }
  })
  onFormSubmitted() {
    this.supplierResource.reload();
  }
}
