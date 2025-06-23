import {Component, effect, inject, input, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Subcategory} from '@models/subcategory';
import {Measure} from '@models/measure';
import {Material, MaterialRequest} from '@models/material';
import {MaterialService} from '@services/http/material-service';
import {ConfirmationDialogService} from '@services/utils/confirmation-dialog-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {ApiResponse} from '@core/interfaces/ApiResponse';

@Component({
  selector: 'app-material-form',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './material-form.html',
  styleUrl: './material-form.scss'
})
export class MaterialForm {
  private service = inject(MaterialService);
  private confirmationService = inject(ConfirmationDialogService);
  readonly selectedSubcategory = input<Subcategory>();
  readonly selectedMeasure = input<Measure>();
  readonly id = input<number>(0);
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

  materialResource = rxResource({
    params: () => ({id: this.id()}),
    stream: ({params}) => {
      if (this.id() > 0) {
        this.isEditing.set(true);
        return this.service.getById(params.id);
      }
      return of({} as ApiResponse<Material>);
    },

  })

 constructor() {
   effect(() => {
     if (this.selectedMeasure()) {
       this.MaterialForm.get('measure')?.setValue(this.selectedMeasure()!.id);
     }
     if (this.selectedSubcategory()) {
       this.MaterialForm.get('subCategory')?.setValue(this.selectedSubcategory()!.id);
     }
   });

   effect(() => {
     this.materialResource.value();
     this.onEditHandler();
   });
 }

  onSubmit() {
    if (!this.isEditing()) {
      this.service.create(this.toMaterial()).subscribe()
    } else {
      this.service.update(this.toMaterial()).subscribe()
    }
    this.setUp();
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


  onDelete() {
    const result = this.confirmationService.openDialog('¿Está seguro de que desea eliminar este material?');
    result.afterClosed().subscribe(result =>{
      if (result) {
        this.service.delete(this.materialResource.value()?.data?.id!).subscribe({
          next: () => {
            this.confirmationService.navigateTo('/material')
          }
        });
      }
    })
  }

  setUp() {
    this.MaterialForm.reset();
    this.isEditing.set(false);
  }

  private onEditHandler() {
    if(this.id()>0){
      this.isEditing.set(true);
      if(!this.materialResource.isLoading()) this.setForm(this.materialResource.value()!.data!)

    }
  }

  private setForm(param : Material) {
    this.MaterialForm.patchValue({
      name: param.name,
      description: param.description,
      brand: param.brand,
      color: param.color,
      subCategory: param.subcategory.id!,
      measure: param.measure.id!,
      unitMeasure: param.unit_measure
    });
  }
}
