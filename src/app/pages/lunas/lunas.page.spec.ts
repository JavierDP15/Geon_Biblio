import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LunasPage } from './lunas.page';

describe('LunasPage', () => {
  let component: LunasPage;
  let fixture: ComponentFixture<LunasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LunasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
