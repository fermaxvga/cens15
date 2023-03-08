import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarNotaCursoComponent } from './cargar-nota-curso.component';

describe('CargarNotaCursoComponent', () => {
  let component: CargarNotaCursoComponent;
  let fixture: ComponentFixture<CargarNotaCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarNotaCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarNotaCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
