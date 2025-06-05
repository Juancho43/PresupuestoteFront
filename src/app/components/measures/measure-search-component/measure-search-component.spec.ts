import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MeasureSearchComponent} from './measure-search-component';

describe('MeasureSearchComponent', () => {
  let component: MeasureSearchComponent;
  let fixture: ComponentFixture<MeasureSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasureSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasureSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
