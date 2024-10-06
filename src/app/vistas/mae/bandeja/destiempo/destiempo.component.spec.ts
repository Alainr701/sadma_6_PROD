import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestiempoComponent } from './destiempo.component';

describe('DestiempoComponent', () => {
  let component: DestiempoComponent;
  let fixture: ComponentFixture<DestiempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestiempoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
