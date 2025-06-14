import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-subcategory-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './subcategory-form.html',
  styleUrl: './subcategory-form.scss'
})
export class SubcategoryForm {
  SubCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });
  categories: any;
    onSubmit() {
        throw new Error('Method not implemented.');
    }
    resetForm($event: MouseEvent) {
        throw new Error('Method not implemented.');
    }

}
