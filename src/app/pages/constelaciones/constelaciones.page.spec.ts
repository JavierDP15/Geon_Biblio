import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConstelacionesPage } from './constelaciones.page';

describe('ConstelacionesPage', () => {
  let component: ConstelacionesPage;
  let fixture: ComponentFixture<ConstelacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstelacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
