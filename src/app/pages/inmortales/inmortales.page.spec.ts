import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InmortalesPage } from './inmortales.page';

describe('InmortalesPage', () => {
  let component: InmortalesPage;
  let fixture: ComponentFixture<InmortalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InmortalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
