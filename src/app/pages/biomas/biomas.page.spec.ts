import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiomasPage } from './biomas.page';

describe('BiomasPage', () => {
  let component: BiomasPage;
  let fixture: ComponentFixture<BiomasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BiomasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
