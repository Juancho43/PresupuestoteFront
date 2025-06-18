import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Measure} from '@models/measure';
import {MeasureService} from '@services/http/measure-service';

@Component({
  selector: 'app-measure-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './measure-form.html',
  styleUrl: './measure-form.scss'
})
export class MeasureForm {
  private service = inject(MeasureService);
  isEditing = signal(false);

  MeasureForm: FormGroup = new FormGroup({
    idCategory: new FormControl(),
    name: new FormControl('', Validators.required),
    abbreviation: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (!this.isEditing()) {
      this.service.create(this.toMeasure()).subscribe()
    } else {
      this.service.update(this.toMeasure()).subscribe()
    }
    // this.setUp();
  }

  toMeasure() : Measure{
    return {
      id: this.MeasureForm.get('idCategory')?.value,
      name: this.MeasureForm.get('name')?.value,
      abbreviation: this.MeasureForm.get('abbreviation')?.value
    }
  }
  resetForm($event: MouseEvent) {
    // this.setUp();
    $event.preventDefault();
  }
}
