import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnableSearcherComponet } from './ownable-searcher-componet';

describe('OwnableSearcherComponet', () => {
  let component: OwnableSearcherComponet;
  let fixture: ComponentFixture<OwnableSearcherComponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnableSearcherComponet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnableSearcherComponet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
