import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioUnidadesComponent } from './inicio-unidades.component';

describe('InicioUnidadesComponent', () => {
  let component: InicioUnidadesComponent;
  let fixture: ComponentFixture<InicioUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioUnidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
