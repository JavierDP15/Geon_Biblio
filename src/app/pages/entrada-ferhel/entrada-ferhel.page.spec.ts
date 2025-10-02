import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntradaFerhelPage } from './entrada-ferhel.page';

describe('EntradaFerhelPage', () => {
  let component: EntradaFerhelPage;
  let fixture: ComponentFixture<EntradaFerhelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaFerhelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
