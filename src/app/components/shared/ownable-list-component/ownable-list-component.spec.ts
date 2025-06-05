import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OwnableListComponent} from './ownable-list-component';

describe('OwnableListComponent', () => {
  let component: OwnableListComponent;
  let fixture: ComponentFixture<OwnableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnableListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
