import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsTagsComponent } from './actions-tags.component';

describe('ActionsTagsComponent', () => {
  let component: ActionsTagsComponent;
  let fixture: ComponentFixture<ActionsTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
