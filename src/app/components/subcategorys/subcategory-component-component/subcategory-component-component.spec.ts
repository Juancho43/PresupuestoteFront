import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryComponentComponent } from './subcategory-component-component';

describe('SubcategoryComponentComponent', () => {
  let component: SubcategoryComponentComponent;
  let fixture: ComponentFixture<SubcategoryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoryComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
