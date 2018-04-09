import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosMenuComponent } from './eventos-menu.component';

describe('EventosMenuComponent', () => {
  let component: EventosMenuComponent;
  let fixture: ComponentFixture<EventosMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
