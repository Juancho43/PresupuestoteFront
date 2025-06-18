import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceAreaComponent} from './invoice-area-component';

describe('InvoiceAreaComponent', () => {
  let component: InvoiceAreaComponent;
  let fixture: ComponentFixture<InvoiceAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
