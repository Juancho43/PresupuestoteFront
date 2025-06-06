import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MeasureCardComponent} from './measure-card-component';

describe('MeasureCardComponent', () => {
  let component: MeasureCardComponent;
  let fixture: ComponentFixture<MeasureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasureCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
