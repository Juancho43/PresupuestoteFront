import {Component, effect, input, output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Item} from '@models/item';

@Component({
  selector: 'app-item-form',
  imports: [ReactiveFormsModule],
  templateUrl: './item-form-component.html',
  styleUrl: './item-form-component.scss'
})
export class ItemFormComponent {

  readonly initialItem = input<Item>({} as Item);
  item = signal<Item>({} as Item);
  finalItem = output<Item>();

  itemForm: FormGroup = new FormGroup({
    materialId: new FormControl(0, Validators.required),
    materialName: new FormControl('Seleccione un material'),
    quantity: new FormControl([Validators.required, Validators.min(1)]),
    price: new FormControl(0, Validators.required),
    stock: new FormControl(0, Validators.required),
  });

  constructor() {
    effect(() => {
      if(this.initialItem()) this.setForm(this.initialItem());
    });
  }

  setForm(item : Item) {
    if(!item.material || !item.material.id ) return;
    this.itemForm.patchValue({
      materialId: item.material.id!,
      materialName: item.material.name,
      price: item.material.latestPrice!.id!,
      stock: item.material.latestStock!.id!,
      quantity: item.quantity
    });
  }

  submitItem() {
    const quantity = this.itemForm.get('quantity')?.value!;
    this.item.set({material: this.initialItem().material, quantity: quantity, price: this.initialItem().material.latestPrice, stock: this.initialItem().material.latestStock});
    this.finalItem.emit(this.item());
  }
}
