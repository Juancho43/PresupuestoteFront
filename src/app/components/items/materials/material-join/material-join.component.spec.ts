import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MaterialJoinComponent} from './material-join.component';

describe('MaterialJoin', () => {
  let component: MaterialJoinComponent;
  let fixture: ComponentFixture<MaterialJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialJoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
