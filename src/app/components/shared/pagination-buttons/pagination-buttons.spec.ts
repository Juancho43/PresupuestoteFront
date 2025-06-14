import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationButtons } from './pagination-buttons';

describe('PaginationButtons', () => {
  let component: PaginationButtons;
  let fixture: ComponentFixture<PaginationButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationButtons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
