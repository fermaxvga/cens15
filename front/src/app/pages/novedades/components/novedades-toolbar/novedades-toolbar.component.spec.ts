import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadesToolbarComponent } from './novedades-toolbar.component';

describe('NovedadesToolbarComponent', () => {
  let component: NovedadesToolbarComponent;
  let fixture: ComponentFixture<NovedadesToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovedadesToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovedadesToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
