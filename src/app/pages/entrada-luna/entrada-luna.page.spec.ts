import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntradaLunaPage } from './entrada-luna.page';

describe('EntradaLunaPage', () => {
  let component: EntradaLunaPage;
  let fixture: ComponentFixture<EntradaLunaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaLunaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
