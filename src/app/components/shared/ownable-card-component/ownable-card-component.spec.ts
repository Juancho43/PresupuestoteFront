import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnableCardComponent } from './ownable-card-component';

describe('OwnableCardComponent', () => {
  let component: OwnableCardComponent;
  let fixture: ComponentFixture<OwnableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnableCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
