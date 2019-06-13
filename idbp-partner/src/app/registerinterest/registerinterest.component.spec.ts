import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterinterestComponent } from './registerinterest.component';

describe('RegisterinterestComponent', () => {
  let component: RegisterinterestComponent;
  let fixture: ComponentFixture<RegisterinterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterinterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterinterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
