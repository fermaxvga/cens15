import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoinscripcionComponent } from './autoinscripcion.component';

describe('AutoinscripcionComponent', () => {
  let component: AutoinscripcionComponent;
  let fixture: ComponentFixture<AutoinscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoinscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoinscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
