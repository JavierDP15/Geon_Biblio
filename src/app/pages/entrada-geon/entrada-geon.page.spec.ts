import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntradaGeonPage } from './entrada-geon.page';

describe('EntradaGeonPage', () => {
  let component: EntradaGeonPage;
  let fixture: ComponentFixture<EntradaGeonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaGeonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
