import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustsafetyComponent } from './trustsafety.component';

describe('TrustsafetyComponent', () => {
  let component: TrustsafetyComponent;
  let fixture: ComponentFixture<TrustsafetyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustsafetyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustsafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
