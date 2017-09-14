import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundedShowcaseComponent } from './funded-showcase.component';

describe('FundedShowcaseComponent', () => {
  let component: FundedShowcaseComponent;
  let fixture: ComponentFixture<FundedShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundedShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundedShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
