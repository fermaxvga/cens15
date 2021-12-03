import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoPorMateriaComponent } from './curso-por-materia.component';

describe('CursoPorMateriaComponent', () => {
  let component: CursoPorMateriaComponent;
  let fixture: ComponentFixture<CursoPorMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoPorMateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoPorMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
