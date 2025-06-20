import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TextAdvise} from './text-advise';

describe('TextAdvise', () => {
  let component: TextAdvise;
  let fixture: ComponentFixture<TextAdvise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAdvise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAdvise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
