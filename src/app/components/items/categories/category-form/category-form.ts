import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-category-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss'
})
export class CategoryForm {
  CategoryForm: FormGroup = new FormGroup({
    idCategory: new FormControl(),
    name: new FormControl('', Validators.required),
  });

  onSubmit() {
      throw new Error('Method not implemented.');
  }

  resetForm($event: MouseEvent) {

  }
}
