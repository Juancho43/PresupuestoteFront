import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MaterialSearcherComponent} from './material-searcher-component';

describe('MaterialSearcherComponent', () => {
  let component: MaterialSearcherComponent;
  let fixture: ComponentFixture<MaterialSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialSearcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
