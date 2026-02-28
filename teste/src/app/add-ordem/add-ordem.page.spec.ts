import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOrdemPage } from './add-ordem.page';

describe('AddOrdemPage', () => {
  let component: AddOrdemPage;
  let fixture: ComponentFixture<AddOrdemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrdemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
