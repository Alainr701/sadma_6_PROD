import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaDeRutaComponent } from './hoja-de-ruta.component';

describe('HojaDeRutaComponent', () => {
  let component: HojaDeRutaComponent;
  let fixture: ComponentFixture<HojaDeRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HojaDeRutaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HojaDeRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
