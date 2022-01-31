import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistEditDetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: ChecklistEditDetailsComponent;
  let fixture: ComponentFixture<ChecklistEditDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistEditDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
