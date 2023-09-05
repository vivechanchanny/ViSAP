import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsWhiteboardComponent } from './actions-whiteboard.component';

describe('ActionsWhiteboardComponent', () => {
  let component: ActionsWhiteboardComponent;
  let fixture: ComponentFixture<ActionsWhiteboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsWhiteboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsWhiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
