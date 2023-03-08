import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAusentesComponent } from './listado-ausentes.component';

describe('ListadoAusentesComponent', () => {
  let component: ListadoAusentesComponent;
  let fixture: ComponentFixture<ListadoAusentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoAusentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAusentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
