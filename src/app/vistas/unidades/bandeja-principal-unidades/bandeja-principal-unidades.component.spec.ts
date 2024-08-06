import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaPrincipalUnidadesComponent } from './bandeja-principal-unidades.component';

describe('BandejaPrincipalUnidadesComponent', () => {
  let component: BandejaPrincipalUnidadesComponent;
  let fixture: ComponentFixture<BandejaPrincipalUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejaPrincipalUnidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandejaPrincipalUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
