import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceViewComponent } from './price-view-component';

describe('PriceViewComponent', () => {
  let component: PriceViewComponent;
  let fixture: ComponentFixture<PriceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
