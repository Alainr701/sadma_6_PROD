import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaCComponent } from './entrada-c.component';

describe('EntradaCComponent', () => {
  let component: EntradaCComponent;
  let fixture: ComponentFixture<EntradaCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradaCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntradaCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
