import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-material-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './material-form.html',
  styleUrl: './material-form.scss'
})
export class MaterialForm {


  MaterialForm: FormGroup = new FormGroup({
    measure: new FormControl('', Validators.required),
    unitMeasure: new FormControl('', Validators.required),
    subCategory: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    brand: new FormControl(''),
    color: new FormControl(''),
  });
  subCategories: any;

  onSubmit() {
    
  }

  resetForm($event: MouseEvent) {
    
  }
}
