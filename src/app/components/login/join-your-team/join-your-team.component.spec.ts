import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinYourTeamComponent } from './join-your-team.component';

describe('JoinYourTeamComponent', () => {
  let component: JoinYourTeamComponent;
  let fixture: ComponentFixture<JoinYourTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinYourTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinYourTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
