import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoLlegarComponent } from './como-llegar.component';

describe('ComoLlegarComponent', () => {
  let component: ComoLlegarComponent;
  let fixture: ComponentFixture<ComoLlegarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComoLlegarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComoLlegarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
