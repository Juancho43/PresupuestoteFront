import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSearchComponent } from './budget-search-component';

describe('BudgetSearchComponent', () => {
  let component: BudgetSearchComponent;
  let fixture: ComponentFixture<BudgetSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
