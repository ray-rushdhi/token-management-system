import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenManagementComponent } from './token-management.component';

describe('TokenManagementComponent', () => {
  let component: TokenManagementComponent;
  let fixture: ComponentFixture<TokenManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokenManagementComponent]
    });
    fixture = TestBed.createComponent(TokenManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
