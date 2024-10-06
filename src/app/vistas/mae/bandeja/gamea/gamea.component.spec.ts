import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameaComponent } from './gamea.component';

describe('GameaComponent', () => {
  let component: GameaComponent;
  let fixture: ComponentFixture<GameaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
