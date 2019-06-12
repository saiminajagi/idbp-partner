import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiproductsComponent } from './apiproducts.component';

describe('ApiproductsComponent', () => {
  let component: ApiproductsComponent;
  let fixture: ComponentFixture<ApiproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
