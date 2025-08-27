import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeonesPage } from './geones.page';

describe('GeonesPage', () => {
  let component: GeonesPage;
  let fixture: ComponentFixture<GeonesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeonesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
