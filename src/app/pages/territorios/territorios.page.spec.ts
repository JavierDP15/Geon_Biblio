import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerritoriosPage } from './territorios.page';

describe('TerritoriosPage', () => {
  let component: TerritoriosPage;
  let fixture: ComponentFixture<TerritoriosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoriosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
