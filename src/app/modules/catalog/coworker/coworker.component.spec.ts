import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoworkerComponent } from './coworker.component';

describe('CoworkerComponent', () => {
  let component: CoworkerComponent;
  let fixture: ComponentFixture<CoworkerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CoworkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
