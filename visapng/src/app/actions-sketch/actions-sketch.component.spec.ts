import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsSketchComponent } from './actions-sketch.component';

describe('ActionsSketchComponent', () => {
  let component: ActionsSketchComponent;
  let fixture: ComponentFixture<ActionsSketchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsSketchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsSketchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
