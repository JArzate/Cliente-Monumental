import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEventoComponent } from './ficha-evento.component';

describe('FichaEventoComponent', () => {
  let component: FichaEventoComponent;
  let fixture: ComponentFixture<FichaEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
