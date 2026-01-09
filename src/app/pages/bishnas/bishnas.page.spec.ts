import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BishnasPage } from './bishnas.page';

describe('BishnasPage', () => {
  let component: BishnasPage;
  let fixture: ComponentFixture<BishnasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BishnasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
