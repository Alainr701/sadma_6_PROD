import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrespondenciasComponent } from './correspondencias.component';

describe('CorrespondenciasComponent', () => {
  let component: CorrespondenciasComponent;
  let fixture: ComponentFixture<CorrespondenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrespondenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrespondenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
