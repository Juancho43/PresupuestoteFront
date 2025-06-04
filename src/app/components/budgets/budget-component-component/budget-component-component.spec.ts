import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetComponentComponent } from './budget-component-component';

describe('BudgetComponentComponent', () => {
  let component: BudgetComponentComponent;
  let fixture: ComponentFixture<BudgetComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
