import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservarFerhelPage } from './observar-ferhel.page';

describe('ObservarFerhelPage', () => {
  let component: ObservarFerhelPage;
  let fixture: ComponentFixture<ObservarFerhelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservarFerhelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
