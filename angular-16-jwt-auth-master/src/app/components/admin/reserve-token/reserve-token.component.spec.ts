import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveTokenComponent } from './reserve-token.component';

describe('ReserveTokenComponent', () => {
  let component: ReserveTokenComponent;
  let fixture: ComponentFixture<ReserveTokenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserveTokenComponent]
    });
    fixture = TestBed.createComponent(ReserveTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
