import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MeasureForm} from './measure-form';

describe('MeasureForm', () => {
  let component: MeasureForm;
  let fixture: ComponentFixture<MeasureForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasureForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasureForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
