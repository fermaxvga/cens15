import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPreCargadosComponent } from './listar-pre-cargados.component';

describe('ListarPreCargadosComponent', () => {
  let component: ListarPreCargadosComponent;
  let fixture: ComponentFixture<ListarPreCargadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPreCargadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPreCargadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
