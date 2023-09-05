import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsAnnotationComponent } from './actions-annotation.component';

describe('ActionsAnnotationComponent', () => {
  let component: ActionsAnnotationComponent;
  let fixture: ComponentFixture<ActionsAnnotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsAnnotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
