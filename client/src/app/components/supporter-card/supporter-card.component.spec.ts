import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupporterCardComponent } from './supporter-card.component';

describe('SupporterCardComponent', () => {
  let component: SupporterCardComponent;
  let fixture: ComponentFixture<SupporterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupporterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupporterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
