import {Component, inject, input, linkedSignal, OnInit} from '@angular/core';
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
export class MaterialForm implements OnInit{
  private service = inject(MaterialService);
  private confirmationService = inject(ConfirmationDialogService);
  readonly selectedSubcategory = input<Subcategory>();
  readonly selectedMeasure = input<Measure>();
  readonly id = input<number>(0);

  isEditing= linkedSignal(()=>{
    return this.id() > 0;
  });

  materialResource = rxResource({
    params: () => ({id: this.id()}),
    stream: ({params}) => {
      if (this.isEditing()) {
        return this.service.getById(params.id);
      }
      return of({} as ApiResponse<Material>);
    },
  })

  subcategory = linkedSignal<Subcategory>(() => {
    if (this.selectedSubcategory() !== undefined && this.selectedSubcategory()?.id!> 0) {
      return this.selectedSubcategory()!;
    }
    if(!this.materialResource.isLoading() && this.isEditing()){
      return this.materialResource.value()!.data!.subcategory;
    }
    return {name:'Seleccione un sub rubro'} as Subcategory;
  });

  measure = linkedSignal<Measure>(() => {
    if (this.selectedMeasure() !== undefined && this.selectedMeasure()?.id!> 0) {
      return this.selectedMeasure()!;
    }
    if(!this.materialResource.isLoading() && this.isEditing()){
      return this.materialResource.value()!.data!.measure;
    }
    return {name:'Seleccione una unidad de medida'} as Measure;
  });


  MaterialForm: FormGroup = new FormGroup({
    unitMeasure: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    brand: new FormControl(''),
    color: new FormControl(''),
  });

  ngOnInit() {
    this.checkAndSetForm();
  }

  private checkAndSetForm() {
    if (this.isEditing() && !this.materialResource.isLoading() && this.materialResource.value()) {
      this.setForm(this.materialResource.value()!.data!);
    } else if (this.isEditing()) {
      setTimeout(() => this.checkAndSetForm(), 100);
    }
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
      id: this.isEditing() ? this.materialResource.value()?.data?.id : undefined,
      name: this.MaterialForm.get('name')?.value,
      description: this.MaterialForm.get('description')?.value,
      brand: this.MaterialForm.get('brand')?.value,
      color: this.MaterialForm.get('color')?.value,
      sub_category_id: this.subcategory().id!,
      measure_id: this.measure().id!,
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

  private setForm(param : Material) {
    this.MaterialForm.patchValue({
      name: param.name,
      description: param.description,
      brand: param.brand,
      color: param.color,
      measure: param.measure.id!,
    });
  }
}
