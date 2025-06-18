import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceMaterialForm} from './invoice-material-form';

describe('InvoiceMaterialForm', () => {
  let component: InvoiceMaterialForm;
  let fixture: ComponentFixture<InvoiceMaterialForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceMaterialForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceMaterialForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
