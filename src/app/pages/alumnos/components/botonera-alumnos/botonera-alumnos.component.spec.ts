import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotoneraAlumnosComponent } from './botonera-alumnos.component';

describe('BotoneraAlumnosComponent', () => {
  let component: BotoneraAlumnosComponent;
  let fixture: ComponentFixture<BotoneraAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotoneraAlumnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotoneraAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
