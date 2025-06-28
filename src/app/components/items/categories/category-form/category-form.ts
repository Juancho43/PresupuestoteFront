import {Component, inject, input, linkedSignal, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryService} from '@services/http/category-service';
import {Category} from '@models/category';
import {ConfirmationDialogService} from '@services/utils/confirmation-dialog-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {of} from 'rxjs';

@Component({
  selector: 'app-category-form',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss'
})
export class CategoryForm implements OnInit {
  private service = inject(CategoryService);
  private confirmationService = inject(ConfirmationDialogService);
  readonly id = input<number>(0)
  isEditing= linkedSignal(()=>{
    return this.id() > 0;
  });

  CategoryForm: FormGroup = new FormGroup({
    idCategory: new FormControl(),
    name: new FormControl('', Validators.required),
  });

  categoryResource = rxResource({
    params: () => ({id: this.id()}),
    stream: ({params}) => {
      if (this.isEditing()) {
        return this.service.getById(params.id);
      }
      return of({} as ApiResponse<Category>);
    },

  });


  ngOnInit() {
    this.checkAndSetForm();
  }

  private checkAndSetForm() {
    if (this.isEditing() && !this.categoryResource.isLoading() && this.categoryResource.value()) {
      this.setForm(this.categoryResource.value()!.data!);
    } else if (this.isEditing()) {
      setTimeout(() => this.checkAndSetForm(), 100);
    }
  }
  onSubmit() {
    if (!this.isEditing()) {
      this.service.create(this.toCategory()).subscribe()
    } else {
      this.service.update(this.toCategory()).subscribe()
    }
    this.setUp();
  }

  toCategory() : Category{
      return {
        id: this.id(),
        name: this.CategoryForm.get('name')?.value,
      }
  }



  onDelete() {
    const result = this.confirmationService.openDialog('¿Está seguro de que desea eliminar esta categoria?');
    result.afterClosed().subscribe(result =>{
      if (result) {
        this.service.delete(this.categoryResource.value()?.data?.id!).subscribe({
          next: () => {
            this.confirmationService.navigateTo('/material')
          }
        });
      }
    })
  }

  setUp() {
    this.CategoryForm.reset();
    this.isEditing.set(false);
  }

  private setForm(param : Category) {
    this.CategoryForm.patchValue({
      name: param.name,

    });
  }
}
