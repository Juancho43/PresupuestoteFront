import {Component, effect, input, output, signal} from '@angular/core';
import {Material} from '@models/material';
import {Price} from '@models/price';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-price-form',
  imports: [
    FormsModule
  ],
  templateUrl: './price-form.component.html',
  styleUrl: './price-form.component.scss'
})
export class PriceForm {
  readonly material = input<Material>();
  newPrice = output<Material>();
  price = signal<number>(0);


  constructor() {
    effect(() => {
      if (this.material()!=undefined)  this.price.set(this.material()!.latestPrice.price);
    });
  }

  onSubmit() {
    if (this.material()) {
      const newMaterial: Material = {
        ...this.material()!,
        latestPrice: {
          price: this.price(),
          date: new Date()
        } as Price
      };
      this.newPrice.emit(newMaterial);
    }
  }

}
