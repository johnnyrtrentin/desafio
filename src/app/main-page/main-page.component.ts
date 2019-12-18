import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authetication.service';
import { ManipulateListsService } from '../services/manipulate-lists.service';
import { ManipulateTasksService } from '../services/manipulate-tasks.service';

import { ListModel } from '../models/list-create.model';
import { ListInfo } from '../models/list-info.model';
import { TaskModel } from '../models/task.model';

@Component({
  selector: 'app-manipulate-list',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  private numberID = 1;
  private haveTask: boolean = false;

  public newList: ListModel = new ListModel;
  public newTask: TaskModel = new TaskModel;
  public dataFromNewGeneratedList: ListInfo;
  public allList: Array<any> = [];
  public allTask: Array<TaskModel> = [];
  public showTasks: Array<any> = [];

  constructor(private auth: AuthenticationService, private listService: ManipulateListsService,
    private taskService: ManipulateTasksService) { }

  ngOnInit() { }

  getTokenAccess(): void {
    this.auth.generateToken('johnny.trentin@desafiofluig.com', 'Johnny@123').subscribe(response =>
      console.log(response));
  }

  createNewList(): void {
    this.newList.sortValue = this.numberID++;
    this.dataFromNewGeneratedList = new ListInfo;

    this.listService.createList(this.newList).subscribe(response => {
      for (const key in response) {
        if (key === 'id') {
          this.dataFromNewGeneratedList.id = response[key];
        } else if (key === 'name') {
          this.dataFromNewGeneratedList.name = response[key];
        } else if (key === 'description') {
          this.dataFromNewGeneratedList.description = response[key];
        }
      }
      this.allList.push(this.dataFromNewGeneratedList);
    });
    this.resetInputsList();
  }
  createNewTask(): void {
    if (this.newTask.name !== undefined) {
      this.taskService.createTask(this.dataFromNewGeneratedList.id, this.newTask)
        .subscribe(response => {
          this.dataFromNewGeneratedList.tasks = [];
          this.allTask.push(response);
          this.allList.map(valuesList => {
            this.allTask.map(valuesTask => {
              if (valuesList['id'] === valuesTask['listId'])
                this.dataFromNewGeneratedList.tasks.push(valuesTask);
            });
          });
        });
    }
    this.resetInputsModal();
    this.returnTaskName();
  }

  resetInputsList(): void {
    this.newList.name = null;
    this.newList.description = null;
  }

  public returnTaskName() {
    console.log(this.allList)
    // console.log(this.allTask):
    // console.log(this.dataFromNewGeneratedList)
    // this.allList.map(valuesList => {
    //   this.allTask.forEach(valuesTask => {
    //     console.log(valuesTask);
    //     if (valuesList['id'] === valuesTask['listId'])
    //       this.allList.push(valuesTask);

    //     // this.dataFromNewGeneratedList.tasks.push(valuesTask);
    //   });
    // });
  }

  resetInputsModal(): void {
    this.newTask.name = null;
  }
}
