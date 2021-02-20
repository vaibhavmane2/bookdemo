import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ApiService } from "../common/api.service";
import { MesseagepassService } from "../common/messeagepass.service";
import * as data from "./data.json";
import * as moment from 'moment'

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  items = [];
  items2 = []
  ischecked: any
  filterData = {
    filterby: "",
    searchtext: "",
    authorbooksarr: [],
    pagecount: "",
    date: "",
  };
  
  constructor(
    private missionService: MesseagepassService,
    private dialog: MatDialog,
    private observableService: ApiService
  ) {
      
  }

  ngOnInit(): void {
    this.items = (data as any).default;
    this.items2 = JSON.parse(JSON.stringify(this.items))
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }
  matChangedValue(event) {
    console.log(event);
    this.filterData.pagecount = event;
    this.filterData.filterby = "pagecount";
    this.missionService.changeMessage(this.filterData);
  }
  searchTextChange(text: any) {
    console.log(text);
    this.clearAll()
    this.items.forEach(element => element.ischecked = false);
    this.items2.forEach(element => element.ischecked = false);
    this.filterData.searchtext = text;
    this.filterData.authorbooksarr = []
    this.filterData.pagecount= "",
    this.filterData.date= ""
    this.filterData.filterby = "searchbar";
    this.missionService.changeMessage(this.filterData);
  }

  checkItemChecked(item:any , flag:any) {
    console.log(item,flag);
    
    return item.ischecked && flag == this.ischecked
  }
  selectedItem(event: any, item: any) {
    console.log(event, item);
    this.filterData.searchtext = ''
    if (event == true) {
      this.filterData.authorbooksarr.push(item);
    }
    if (event == false) {
      const index = this.filterData.authorbooksarr.indexOf(item);
      console.log(index);
      
      if (index > -1) {
        this.filterData.authorbooksarr.splice(index, 1);
      }
    }
    console.log(this.filterData);
    this.filterData.filterby = "authorbook";

    this.missionService.changeMessage(this.filterData);
  }
  public onDate(event): void {
     this.filterData.filterby = "datefilter";
      this.filterData.date = moment(event.value).format('DD/MM/YYYY')
      console.log(this.filterData);
      
    this.missionService.changeMessage(this.filterData);
  }
  clearAll(): void {
    this.items.forEach(element => element.ischecked = false);
    this.items2.forEach(element => element.ischecked = false);
    
    
    this.filterData = {
    filterby: "",
    searchtext: "",
    authorbooksarr: [],
    pagecount: "",
    date: "",
  }
      this.missionService.changeMessage(this.filterData);

  }
}
