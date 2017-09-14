import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NologinComponent } from './nologin.component';

describe('NologinComponent', () => {
  let component: NologinComponent;
  let fixture: ComponentFixture<NologinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NologinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NologinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
