import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientManagerComponent } from './patient-manager.component';

describe('PatientManagerComponent', () => {
  let component: PatientManagerComponent;
  let fixture: ComponentFixture<PatientManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientManagerComponent]
    });
    fixture = TestBed.createComponent(PatientManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
