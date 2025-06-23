import {Component, effect, inject, input, OnInit, output, signal} from '@angular/core';
import {Material} from '@models/material';
import {AddMaterialsToInvoiceRequest, Invoice} from '@models/invoice';
import {InvoiceService} from '@services/http/invoice-service';
import {FormsModule} from '@angular/forms';
import {ItemCard} from '@components/items/item-card/item-card';

@Component({
  selector: 'app-invoice-material-form',
  imports: [
    FormsModule,
    ItemCard
  ],
  templateUrl: './invoice-material-form.html',
  styleUrl: './invoice-material-form.scss'
})
export class InvoiceMaterialForm  implements OnInit {
  private service = inject(InvoiceService);
  isEdit = signal<boolean>(true);
  invoice = input<Invoice>({} as Invoice);



  item = input<Material>({} as Material);
  materialList = signal<Material[]>([]);
  selectedItem = output<Material>();
  submitted = output<Material[]>();


  ngOnInit() {
    this.materialList.set(this.invoice().materials || []);
  }

  constructor() {
    effect(() => {
      // Only react to item changes and add to materialsList if item has an id
      const newItem = this.item();
      if (newItem && newItem.id) {
        this.materialList.update((items) => {
          const existingItem = items.find(i => i.id === newItem.id);
          if (!existingItem) {
            return [...items, newItem];
          } else {
            // Update existing item
            const index = items.findIndex(i => i.id === newItem.id);
            items[index] = newItem;
          }
          return items;
        });
      }
    });
  }
  submit() {
    this.submitMaterials(this.invoice().id!, this.materialList());
  }
  submitMaterials(invoiceId : number,materials: Material[]) {
    const addMaterialsToInvoiceRequest: AddMaterialsToInvoiceRequest = {
      invoice_id: invoiceId,
      materials: materials.map(material => (
        {
          id: material.id!,
          quantity: material.quantity || 1,
          price : material.latestPrice.price
        }
      ))
    }
    this.service.addMaterial(addMaterialsToInvoiceRequest).subscribe();
  }

  deleteItem(item: Material) {
    this.materialList.update((items) => {
      return items.filter(i => i.id !== item.id);
    })
  }

  onDelete() {

  }

  setUp() {

  }
}
