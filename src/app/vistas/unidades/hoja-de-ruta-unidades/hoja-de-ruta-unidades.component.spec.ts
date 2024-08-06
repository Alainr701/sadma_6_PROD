import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaDeRutaUnidadesComponent } from './hoja-de-ruta-unidades.component';

describe('HojaDeRutaUnidadesComponent', () => {
  let component: HojaDeRutaUnidadesComponent;
  let fixture: ComponentFixture<HojaDeRutaUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HojaDeRutaUnidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HojaDeRutaUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
