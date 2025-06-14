import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MaterialAreaComponent} from './material-area-component';

describe('MaterialAreaComponent', () => {
  let component: MaterialAreaComponent;
  let fixture: ComponentFixture<MaterialAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
