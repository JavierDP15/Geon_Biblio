import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerritorioPage } from './territorio.page';

describe('TerritorioPage', () => {
  let component: TerritorioPage;
  let fixture: ComponentFixture<TerritorioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
