import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistEditTasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: ChecklistEditTasksComponent;
  let fixture: ComponentFixture<ChecklistEditTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistEditTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistEditTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
