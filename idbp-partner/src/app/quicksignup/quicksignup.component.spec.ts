import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuicksignupComponent } from './quicksignup.component';

describe('QuicksignupComponent', () => {
  let component: QuicksignupComponent;
  let fixture: ComponentFixture<QuicksignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuicksignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuicksignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
