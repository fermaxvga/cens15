import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarAusenciasComponent } from './cargar-ausencias.component';

describe('CargarAusenciasComponent', () => {
  let component: CargarAusenciasComponent;
  let fixture: ComponentFixture<CargarAusenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarAusenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarAusenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
