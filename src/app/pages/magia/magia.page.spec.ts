import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagiaPage } from './magia.page';

describe('MagiaPage', () => {
  let component: MagiaPage;
  let fixture: ComponentFixture<MagiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MagiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
