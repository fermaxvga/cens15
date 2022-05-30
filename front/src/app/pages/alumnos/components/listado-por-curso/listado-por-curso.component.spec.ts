import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPorCursoComponent } from './listado-por-curso.component';

describe('ListadoPorCursoComponent', () => {
  let component: ListadoPorCursoComponent;
  let fixture: ComponentFixture<ListadoPorCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPorCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPorCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
