import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreCargarComponent } from './pre-cargar.component';

describe('PreCargarComponent', () => {
  let component: PreCargarComponent;
  let fixture: ComponentFixture<PreCargarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreCargarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreCargarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
