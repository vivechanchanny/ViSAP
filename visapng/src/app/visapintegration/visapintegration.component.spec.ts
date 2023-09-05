import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisapintegrationComponent } from './visapintegration.component';

describe('VisapintegrationComponent', () => {
  let component: VisapintegrationComponent;
  let fixture: ComponentFixture<VisapintegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisapintegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisapintegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
