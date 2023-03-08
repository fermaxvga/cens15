import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AusenciaDocentesComponent } from './ausencia-docentes.component';

describe('AusenciaDocentesComponent', () => {
  let component: AusenciaDocentesComponent;
  let fixture: ComponentFixture<AusenciaDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AusenciaDocentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AusenciaDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
