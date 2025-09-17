import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntradaTerritorioPage } from './entrada-territorio.page';

describe('EntradaTerritorioPage', () => {
  let component: EntradaTerritorioPage;
  let fixture: ComponentFixture<EntradaTerritorioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaTerritorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
