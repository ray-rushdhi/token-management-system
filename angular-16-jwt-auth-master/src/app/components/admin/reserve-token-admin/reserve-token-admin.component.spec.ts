import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveTokenAdminComponent } from './reserve-token-admin.component';

describe('ReserveTokenAdminComponent', () => {
  let component: ReserveTokenAdminComponent;
  let fixture: ComponentFixture<ReserveTokenAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserveTokenAdminComponent]
    });
    fixture = TestBed.createComponent(ReserveTokenAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
