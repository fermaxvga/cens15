import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerMasterComponent } from './spinner-master.component';

describe('SpinnerMasterComponent', () => {
  let component: SpinnerMasterComponent;
  let fixture: ComponentFixture<SpinnerMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
