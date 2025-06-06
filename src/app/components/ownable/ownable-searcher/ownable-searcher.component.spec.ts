import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OwnableSearcherComponent} from './ownable-searcher.component';

describe('OwnableSearcherComponet', () => {
  let component: OwnableSearcherComponent;
  let fixture: ComponentFixture<OwnableSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnableSearcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnableSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
