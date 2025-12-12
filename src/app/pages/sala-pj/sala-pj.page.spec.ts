import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalaPjPage } from './sala-pj.page';

describe('SalaPjPage', () => {
  let component: SalaPjPage;
  let fixture: ComponentFixture<SalaPjPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaPjPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
