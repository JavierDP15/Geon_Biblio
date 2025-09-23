import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FerhelPage } from './ferhel.page';

describe('FerhelPage', () => {
  let component: FerhelPage;
  let fixture: ComponentFixture<FerhelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FerhelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
