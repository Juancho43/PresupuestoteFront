import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OwnableSelector} from './ownable-selector';

describe('OwnableSelector', () => {
  let component: OwnableSelector;
  let fixture: ComponentFixture<OwnableSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnableSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnableSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
