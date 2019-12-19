import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authetication.service';
import { ListsService } from '../services/list.service';
import { TasksService } from '../services/tasks.service';

import { TaskModel } from '../models/tasks.model';
import { ListModel } from '../models/list.model';
import { ListModelInformation } from '../models/list-info.model';

@Component({
  selector: 'app-manipulate-list',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent {
  private numberID = 1;

  public listModel: ListModelInformation;
  public newList: ListModel = new ListModel();
  public newTask: TaskModel = new TaskModel();
  public allList: Array<any> = [];
  public allTask: Array<TaskModel> = [];

  constructor(private auth: AuthenticationService, private listService: ListsService,
              private taskService: TasksService) { }

  public getTokenAccess(): void {
    this.auth.generateToken('johnny.trentin@desafiofluig.com', 'Johnny@123')
      .subscribe(response => ({}));
  }

  public createNewList(): void {
    this.newList.sortValue = this.numberID++;
    this.listModel = new ListModelInformation();

    this.listService.createList(this.newList).subscribe(response => {
      for (const key in response) {
        if (key === 'id') {
          this.listModel.id = response[key];
        } else if (key === 'name') {
          this.listModel.name = response[key];
        } else if (key === 'description') {
          this.listModel.description = response[key];
        }
      }
      this.allList.push(this.listModel);
    });
    this.resetInputsList();
  }

  public createNewTask(): void {
    if (this.newTask.name !== undefined) {
      this.taskService.createTask(this.listModel.id, this.newTask).subscribe(response => {
        this.allTask.push(response);

        this.allList.filter(valuesList => {
          this.listModel.tasks = [];

          this.allTask.map(valuesTask => {
            if (valuesList.id === valuesTask.listId) {
              this.listModel.tasks.push(valuesTask);
            }
          });
        });
      });
    }
    this.resetInputsModal();
  }

  public resetInputsList(): void {
    this.newList.name = null;
    this.newList.description = null;
  }

  public resetInputsModal(): void {
    this.newTask.name = null;
  }

  public editTask(): void { }
  public deleteTask(): void { }
  public editStatusTask(): void { }
}
