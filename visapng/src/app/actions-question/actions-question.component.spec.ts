import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsQuestionComponent } from './actions-question.component';

describe('ActionsQuestionComponent', () => {
  let component: ActionsQuestionComponent;
  let fixture: ComponentFixture<ActionsQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
