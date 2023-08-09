import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTokenComponent } from './issue-token.component';

describe('IssueTokenComponent', () => {
  let component: IssueTokenComponent;
  let fixture: ComponentFixture<IssueTokenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueTokenComponent]
    });
    fixture = TestBed.createComponent(IssueTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
