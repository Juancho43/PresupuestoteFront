import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PriceForm} from './price-form.component';

describe('PriceFormComponent', () => {
  let component: PriceForm;
  let fixture: ComponentFixture<PriceForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
