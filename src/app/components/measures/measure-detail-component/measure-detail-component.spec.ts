import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MeasureDetailComponent} from './measure-detail-component';

describe('MeasureDetailComponent', () => {
  let component: MeasureDetailComponent;
  let fixture: ComponentFixture<MeasureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasureDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
