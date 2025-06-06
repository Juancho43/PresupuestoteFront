import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IPersonCardComponent} from './i-person-card.component';

describe('CardComponet', () => {
  let component: IPersonCardComponent;
  let fixture: ComponentFixture<IPersonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IPersonCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IPersonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
