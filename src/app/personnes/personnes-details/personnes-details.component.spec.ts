import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnesDetailsComponent } from './personnes-details.component';

describe('PersonnesDetailsComponent', () => {
  let component: PersonnesDetailsComponent;
  let fixture: ComponentFixture<PersonnesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
