import {Component, inject} from '@angular/core';
import {SupplierFormComponent} from '../supplier-form-component/supplier-form-component';
import {PersonListComponent} from "@shared/person-list-component/person-list-component";
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
  supplierResource = rxResource({
    stream :() => {
      return this.service.getAll();
    }
  })

}
