import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LugaresTerritorioPage } from './lugares-territorio.page';

describe('LugaresTerritorioPage', () => {
  let component: LugaresTerritorioPage;
  let fixture: ComponentFixture<LugaresTerritorioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LugaresTerritorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
