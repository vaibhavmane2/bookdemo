import { Component, OnInit,OnChanges } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import {MesseagepassService } from "../../common/messeagepass.service";
import * as data from '../data.json';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit,OnChanges {
title = 'userdashboarddemo';
books: any
  
  constructor(private missionService: MesseagepassService) { 
     this.missionService.currentMessage.subscribe((message: any) => {
    console.log(message.filterby);
    if (message.filterby != undefined && message) {
      var temparr = []
      temparr = (data as any).default.filter(obj => {
        if (message.filterby == 'authorbook') {
          const isAuthor = message.authorbooksarr.includes(obj.author_Name)
          const isBook = message.authorbooksarr.includes(obj.book_Name)
          
          if (isAuthor == true || isBook == true) {
            return obj
          } 
        }
        if (message.filterby == 'searchbar') {
          const isAuthor = obj.author_Name.toLowerCase().includes(message.searchtext.toLowerCase())
          const isBook = obj.book_Name.toLowerCase().includes(message.searchtext.toLowerCase())
          const ispages = obj.pages.includes(message.searchtext)
          if (isAuthor == true || isBook == true || ispages == true) {
            return obj
          } 
        }
        if (message.filterby == 'datefilter') {
          const isDate = obj.publish_Date.includes(message.date)
          if (isDate == true) {
            return obj
          } 
        }
        if (message.filterby == 'pagecount') {
          if (obj.pages <= message.pagecount) {
            return obj
          }
        }
      })
      console.log(temparr);
      this.books = temparr.length > 0 || message.searchtext.length != 0 || message.date.length != 0 || message.pagecount.length != 0? temparr : (data as any).default;
    } 
     
      console.log(this.books);
    })
  }

  ngOnChanges(): void {
    
  }

  ngOnInit(): void {
    this.books = (data as any).default;
    
  }

}
