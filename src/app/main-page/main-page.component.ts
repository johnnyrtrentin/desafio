import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authetication.service';
import { ManipulateListsService } from '../services/manipulate-lists.service';

import { ListModel } from '../models/list-create.model';
import { ListInfo } from '../models/list-info.model';

@Component({
  selector: 'app-manipulate-list',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  private numberID = 1;

  public dataFromNewGeneratedList = new ListInfo();
  public allListsCreated: object = {};
  public newList = new ListModel();
  public allList: Array<object> = [];
  public modalData: any;

  constructor(private auth: AuthenticationService, private listService: ManipulateListsService) { }

  ngOnInit() { }

  getTokenAccess(): void {
    this.auth.generateToken('johnny.trentin@desafiofluig.com', 'Johnny@123').subscribe(response =>
      console.log(response));
  }

  createNewList(): void {
    this.newList.sortValue = this.numberID++;
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
      console.log(this.allList)
      // Object.assign(this.allLists, this.listInfo);
      // this.tst = Object.keys(this.allLists).map(value =>
      //     this.allLists[value]);
      // console.log(response);
      // console.log(this.allLists);
      // console.log(this.tst);

    });

    this.resetInputsList();
  }
  createNewTask(): void {
    console.log(this.modalData);

    this.resetInputsModal();
  }

  resetInputsList(): void {
    this.newList.name = null;
    this.newList.description = null;
  }

  resetInputsModal(): void {
    this.modalData = null;
  }
}
