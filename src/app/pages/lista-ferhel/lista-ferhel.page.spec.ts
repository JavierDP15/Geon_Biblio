import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaFerhelPage } from './lista-ferhel.page';

describe('ListaFerhelPage', () => {
  let component: ListaFerhelPage;
  let fixture: ComponentFixture<ListaFerhelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFerhelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
