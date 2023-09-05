import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsHotspotComponent } from './actions-hotspot.component';

describe('ActionsHotspotComponent', () => {
  let component: ActionsHotspotComponent;
  let fixture: ComponentFixture<ActionsHotspotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsHotspotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsHotspotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
