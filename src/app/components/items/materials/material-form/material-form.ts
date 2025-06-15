import {Component, effect, inject, input, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Subcategory} from '@models/subcategory';
import {Measure} from '@models/measure';
import {MaterialRequest} from '@models/material';
import {MaterialService} from '@services/http/material-service';

@Component({
  selector: 'app-material-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './material-form.html',
  styleUrl: './material-form.scss'
})
export class MaterialForm {
  private service = inject(MaterialService);
  readonly selectedSubcategory = input<Subcategory>();
  readonly selectedMeasure = input<Measure>();
  isEditing= signal(false);
  MaterialForm: FormGroup = new FormGroup({
    measure: new FormControl(0, Validators.required),
    unitMeasure: new FormControl(0, Validators.required),
    subCategory: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    brand: new FormControl(''),
    color: new FormControl(''),
  });


 constructor() {
   effect(() => {
     if (this.selectedMeasure()) {
       this.MaterialForm.get('measure')?.setValue(this.selectedMeasure()!.id);
     }
     if (this.selectedSubcategory()) {
       this.MaterialForm.get('subCategory')?.setValue(this.selectedSubcategory()!.id);
     }
   });
 }

  onSubmit() {
    if (!this.isEditing()) {
      this.service.create(this.toMaterial()).subscribe()
    } else {
      this.service.update(this.toMaterial()).subscribe()
    }
    // this.setUp();
  }

  toMaterial():MaterialRequest{
    return {
      name: this.MaterialForm.get('name')?.value,
      description: this.MaterialForm.get('description')?.value,
      brand: this.MaterialForm.get('brand')?.value,
      color: this.MaterialForm.get('color')?.value,
      sub_category_id: this.MaterialForm.get('subCategory')?.value,
      measure_id: this.MaterialForm.get('measure')?.value,
      unit_measure: this.MaterialForm.get('unitMeasure')?.value
    }
  }

  resetForm($event: MouseEvent) {

  }
}
