import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReserveComponent } from './patient-reserve.component';

describe('PatientReserveComponent', () => {
  let component: PatientReserveComponent;
  let fixture: ComponentFixture<PatientReserveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientReserveComponent]
    });
    fixture = TestBed.createComponent(PatientReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
