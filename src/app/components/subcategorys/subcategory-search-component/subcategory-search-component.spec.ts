import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategorySearchComponent } from './subcategory-search-component';

describe('SubcategorySearchComponent', () => {
  let component: SubcategorySearchComponent;
  let fixture: ComponentFixture<SubcategorySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategorySearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategorySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
