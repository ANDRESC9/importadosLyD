import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditorsListComponent } from './creditors-list.component';

describe('CreditorsListComponent', () => {
  let component: CreditorsListComponent;
  let fixture: ComponentFixture<CreditorsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditorsListComponent]
    });
    fixture = TestBed.createComponent(CreditorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
