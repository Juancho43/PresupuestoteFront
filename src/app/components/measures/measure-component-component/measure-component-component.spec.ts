import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MeasureComponentComponent} from './measure-component-component';

describe('MeasureComponentComponent', () => {
  let component: MeasureComponentComponent;
  let fixture: ComponentFixture<MeasureComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasureComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasureComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
