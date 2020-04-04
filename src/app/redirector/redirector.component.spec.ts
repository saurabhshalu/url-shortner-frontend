import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectorComponent } from './redirector.component';

describe('RedirectorComponent', () => {
  let component: RedirectorComponent;
  let fixture: ComponentFixture<RedirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
