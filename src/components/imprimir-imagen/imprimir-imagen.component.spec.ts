import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirImagenComponent } from './imprimir-imagen.component';

describe('ImprimirImagenComponent', () => {
  let component: ImprimirImagenComponent;
  let fixture: ComponentFixture<ImprimirImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprimirImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
