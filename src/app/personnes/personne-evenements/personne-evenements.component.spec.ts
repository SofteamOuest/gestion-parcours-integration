import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneEvenementsComponent } from './personne-evenements.component';

describe('PersonneEvenementsComponent', () => {
  let component: PersonneEvenementsComponent;
  let fixture: ComponentFixture<PersonneEvenementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonneEvenementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonneEvenementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
