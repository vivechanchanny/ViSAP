import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsLinksComponent } from './actions-links.component';

describe('ActionsLinksComponent', () => {
  let component: ActionsLinksComponent;
  let fixture: ComponentFixture<ActionsLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
