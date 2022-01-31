import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { ChecklistCreateService } from '../checklist.create.service';
import { Router } from '@angular/router';
import { IndustryTermsService } from '../../../../services/industry-terms/industry-terms.service';
import * as lodash from 'lodash';
import { Collection as ChecklistsCollection } from '../../../../services/api/teams/checklists/collection';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements AfterViewInit, OnDestroy {

  @ViewChildren('taskElement') taskElements: QueryList<any>;
  taskElementsSubscribed: any;

  taskElementsSubscription: Subscription;

  focussedTask: any = {
    task: -1,
    group: 0
  };

  createService: ChecklistCreateService;
  industryTerms: IndustryTermsService;

  constructor(
    createService: ChecklistCreateService,
    industryTerms: IndustryTermsService,
    private router: Router,
    private checklistCollection: ChecklistsCollection) {

    this.createService = createService;
    this.industryTerms = industryTerms;

    if (this.createService.checklistName == null) {
      this.router.navigate(['checklists/create']);
    }
  }

  /**
   * Adds a task to the task group
   * @param group task group
   * @param $event
   */
  addTask(group, $event) {

    // Prevent enter from creating a space
    $event.preventDefault();

    // Add a new empty task
    group.tasks.splice(
      this.focussedTask.task + 1,
      0,
      {
        description: ''
      }
    );

    // Focus the new task
    setTimeout(() => {

      const nextElement = lodash(this.taskElementsSubscribed).filter((o) => {
        return <number>o.nativeElement.dataset.groupIndex == this.focussedTask.group
        && <number>o.nativeElement.dataset.taskIndex == this.focussedTask.task + 1;
      }).value();

      this.placeCaretAtEnd(nextElement[0].nativeElement);
    });

  }

   /**
   * Delete's a task if it contains no characters
   * @param group task group
   * @param task task
   * @param index task index in array
   */
  deleteTask(group, task, index, deleteOnEmpty?: boolean) {

    if (deleteOnEmpty) {

      // Delete the task if it has no description
      if (task.description.length === 0) {
        group.tasks.splice(index, 1);

        // Focus the previous task
        setTimeout(() => {

          const previousElement = lodash(this.taskElementsSubscribed).filter((o) => {
            return <number>o.nativeElement.dataset.groupIndex == this.focussedTask.group
            && <number>o.nativeElement.dataset.taskIndex == this.focussedTask.task - 1;
          }).value();

          this.placeCaretAtEnd(previousElement[0].nativeElement);
        });

      }

    } else {

      // Delete the task
      group.tasks.splice(index, 1);

    }


  }

  /**
   * Add a new task group
   */
  addGroup() {
    this.createService.checklistTasks.splice(this.focussedTask.group + 1, 0,
      {
        groupName: `TASK GROUP NAME`,
        tasks: []
      }
    );

    // Focus the group
    setTimeout(() => {

      const previousElement = lodash(this.taskElementsSubscribed).filter((o) => {
        return <number>o.nativeElement.dataset.groupIndex == this.focussedTask.group + 1
        && <number>o.nativeElement.dataset.taskIndex == -1;
      }).value();

      this.placeCaretAtEnd(previousElement[0].nativeElement);
    });

  }

  /**
   * Delete the task group and all included tasks
   * @param index group index
   */
  deleteGroup(index) {

    // Delete the group
    this.createService.checklistTasks.splice(index, 1);

  }

  onFocusSetPosition(groupIndex, taskIndex) {
    this.focussedTask.task = taskIndex;
    this.focussedTask.group = groupIndex;
  }

  /**
   * Places the caret at the end of the text after focusing
   * @param el element
   */
  placeCaretAtEnd(el) {

  if (el.nodeName === 'INPUT') {
    el.focus();
  } else {
      el.focus();
      if (typeof window.getSelection !== 'undefined'
        && typeof document.createRange !== 'undefined') {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (typeof (document.body as any).createTextRange !== 'undefined') {
            const textRange = (document.body as any).createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
      }
    }

  }

  /**
   * After the view initialises, subscribe to the task DOM elements and update the element REF List
   */
  ngAfterViewInit() {

    // Update the list of tasks
    this.taskElementsSubscription = this.taskElements.changes.subscribe((list) => {

      // If the length has decreased, focus back 1 level from the current focused element
      this.taskElementsSubscribed = list._results;

      // If the length has increased, focus forward 1 level from the current focused element
    });
  }

  /**
   * Route back to the create page
   */
  back() {
    this.router.navigate(['checklists/create']);
  }

  ngOnDestroy(): void {
    if (this.taskElementsSubscription) {
      this.taskElementsSubscription.unsubscribe();
    }
  }

  /**
   * Save the new checklist to the DB
   */
  create() {

    // Add an index
    const addIndexToChecklist = lodash.each(this.createService.checklistTasks, (o: any, i) => {
      o.index = i;
      lodash.each(o.tasks, (a: any, index) => {
        a.index = index;
      });
    });

    // Turn into an object
    const checklistObject = lodash(lodash.cloneDeep(addIndexToChecklist))
    .keyBy('index')
    .mapValues((group: any) => {
        group.tasks = lodash.keyBy(group.tasks, 'index');
        return group;
    })
    .value();

    const checklist = {
      name: this.createService.checklistName,
      category: this.createService.checklistCategory,
      checklist: checklistObject
    };

    // Reset Checklist values
    this.createService.reset();

    this.checklistCollection.add(checklist);

  }

}
