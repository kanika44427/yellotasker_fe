import { Component, OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import {AppComponent} from '../app.component';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'routing-root',
  templateUrl: './group-detail.component.html',
  providers: [HttpService, CommonService] 
})
export class GroupDetailComponent implements OnInit {

  parentComponent : any;
  apiResponse : any;
  otherCategoryList :any;
  groupId:any;
  categoryId:any;
  params:any;
  taskList:any;
  constructor(private inj:Injector, private httpService: HttpService, private commonService: CommonService,private route:ActivatedRoute){
    this.parentComponent = this.inj.get(AppComponent); }

  ngOnInit() {
    window.scrollTo(0,0);
    this.route.params.subscribe( params =>
      this.params = params
    )
    if(this.params.categoryId){
      this.httpService.otherCategoryList(this.params.categoryId).subscribe(
        data => {
          this.apiResponse = data;
          console.log(this.apiResponse );
          if(this.apiResponse.message == 'Category of other Category list')
          {
            this.getRecentlyPostedTaskCategory(this.params.categoryId);
            this.otherCategoryList = this.apiResponse.data.otherCategory;
           // this.commonService.hideLoader();
  
          } else {
            this.otherCategoryList = [];
            this.commonService.hideLoader();
          }
      });
    } else {
      this.httpService.otherGroupCategoryList(this.params.id).subscribe(
        data => {
          this.apiResponse = data;
          console.log(this.apiResponse );
          if(this.apiResponse.message == 'Category of other Category list')
          {
            this.getRecentlyPostedTask(this.params.id);
            this.otherCategoryList = this.apiResponse.data.groupCategory;
          //  this.commonService.hideLoader();
  
          } else {
            this.otherCategoryList = [];
            this.commonService.hideLoader();
          }
      });
    }
    
  }
  getRecentlyPostedTask(groupId){
    this.httpService.recentlyPostedTaskByGroupCategory(this.params.id).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Task by group Id found')
        {
          this.taskList = this.apiResponse.data.posted_task;
          this.commonService.hideLoader();

        } else {
          this.taskList = [];
          this.commonService.hideLoader();
        }
    });
  }
  getRecentlyPostedTaskCategory(categoryId){
    this.httpService.recentlyPostedTaskByCategory(categoryId).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Task by group Id found')
        {
          this.taskList = this.apiResponse.data.posted_task;
          this.commonService.hideLoader();

        } else {
          this.taskList = [];
          this.commonService.hideLoader();
        }
    });
  }
}
