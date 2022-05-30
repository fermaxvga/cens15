import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalAutoInscripcionComponent } from './final-auto-inscripcion.component';

describe('FinalAutoInscripcionComponent', () => {
  let component: FinalAutoInscripcionComponent;
  let fixture: ComponentFixture<FinalAutoInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalAutoInscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalAutoInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
