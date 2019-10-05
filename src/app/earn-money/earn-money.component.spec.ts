import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnMoneyComponent } from './earn-money.component';

describe('EarnMoneyComponent', () => {
  let component: EarnMoneyComponent;
  let fixture: ComponentFixture<EarnMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarnMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
