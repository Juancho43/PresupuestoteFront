import {Component, inject, input, linkedSignal, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Measure} from '@models/measure';
import {MeasureService} from '@services/http/measure-service';
import {ConfirmationDialogService} from '@services/utils/confirmation-dialog-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {ApiResponse} from '@core/interfaces/ApiResponse';

@Component({
  selector: 'app-measure-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './measure-form.html',
  styleUrl: './measure-form.scss'
})
export class MeasureForm implements OnInit {
  private service = inject(MeasureService);
  private confirmationService = inject(ConfirmationDialogService);
  readonly id = input<number>(0);
  isEditing= linkedSignal(()=>{
    return this.id() > 0;
  });

  MeasureForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    abbreviation: new FormControl('', Validators.required)
  });

  measureResource = rxResource(
    {
      params: () => ({id: this.id()}),
      stream: ({params}) => {
        if (this.isEditing()) {
          return this.service.getById(params.id);
        }
        return of({} as ApiResponse<Measure>);
      },
    }
  )

  ngOnInit() {
    this.checkAndSetForm();
  }

  private checkAndSetForm() {
    if (this.isEditing() && !this.measureResource.isLoading() && this.measureResource.value()) {
      this.setForm(this.measureResource.value()!.data!);
    } else if (this.isEditing()) {
      setTimeout(() => this.checkAndSetForm(), 100);
    }
  }
  onSubmit() {
    if (!this.isEditing()) {
      this.service.create(this.toMeasure()).subscribe()
    } else {
      this.service.update(this.toMeasure()).subscribe()
    }
    this.setUp();
  }

  toMeasure() : Measure{
    return {
      id: this.id(),
      name: this.MeasureForm.get('name')?.value,
      abbreviation: this.MeasureForm.get('abbreviation')?.value
    }
  }
  onDelete() {
    const result = this.confirmationService.openDialog('¿Está seguro de que desea eliminar esta unidad de medida?');
    result.afterClosed().subscribe(result =>{
      if (result) {
        this.service.delete(this.measureResource.value()!.data!.id!).subscribe({
          next: () => {
            this.confirmationService.navigateTo('/material')
          }
        });
      }
    })
  }

  setUp() {
    this.MeasureForm.reset();
    this.isEditing.set(false);
  }


  private setForm(param : Measure) {
    this.MeasureForm.patchValue({
      id: param.id!,
      name: param.name,
      abbreviation: param.abbreviation
    });
  }
}
