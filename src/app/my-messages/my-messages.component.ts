import { Component , OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'routing-root',
  templateUrl: './my-messages.component.html'
})
export class MyMessagesComponent  implements OnInit {
  apiResponse : any; 
  postedTaskIndicator : boolean; 
  TaskList : any =  [];
  constructor(private httpService: HttpService, private commonService: CommonService){

  }
  ngOnInit() {
    window.scrollTo(0,0);
    this.getTaskByPoster();
  }

  getTaskByPoster(){
   this.postedTaskIndicator = true; 
   this.TaskList = []; 
    var userId=this.commonService.getCookieValues("userid");
    this.commonService.showLoader();
    this.httpService.getPostedTask(userId, "postedTask").subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'All task list')
        {
            if(this.apiResponse.data.postedTask[0].posted_task && this.apiResponse.data.postedTask[0].posted_task.length > 0 ){
              var taskList = this.apiResponse.data.postedTask[0].posted_task; 
              for(var i = 0; i < taskList.length; i++){
                if(taskList[i].status == "assigned"){
                 this.TaskList.push(taskList[i]);
                } 
              }
            }
            this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
    });
  }

  getTaskByDoer(){
    this.TaskList = []; 
    this.postedTaskIndicator = false; 
  }
}
