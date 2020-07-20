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
  currentTaskItem : any; 
  commentList : any = []; 
  checkComment : boolean = true; 
  currentUserId : any;
  user_comment : any;  
  constructor(private httpService: HttpService, private commonService: CommonService){

  }
  ngOnInit() {
    window.scrollTo(0,0);
    this.getTaskByPoster();
  }

  getTaskByPoster(){
   this.currentTaskItem = null; 
   this.postedTaskIndicator = true; 
   this.TaskList = []; 
    this.currentUserId=this.commonService.getCookieValues("userid");
    this.currentUserId = +this.currentUserId; 
    this.commonService.showLoader();
    this.httpService.getPostedTask(this.currentUserId, "postedTask").subscribe(
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
    this.currentTaskItem = null; 
    this.TaskList = []; 
    this.postedTaskIndicator = false; 
    this.currentUserId =this.commonService.getCookieValues("userid");
    this.commonService.showLoader();
    this.httpService.getPostedTask(this.currentUserId , "offerAccepting").subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'All task list')
        {
            if(this.apiResponse.data.offers_accepting[0].offers_accepting && this.apiResponse.data.offers_accepting[0].offers_accepting.length > 0 ){
              var taskList = this.apiResponse.data.offers_accepting[0].offers_accepting; 
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

  getMessagesInDetail(item){
    this.currentTaskItem = item; 
    this.getAllComments(this.currentTaskItem.id); 
  }

  getAllComments(taskId) {
    this.commonService.showLoader();
    this.httpService.getAllComment(taskId).subscribe(
      data => {
        this.apiResponse = data;
        this.commonService.showLoader();
        if (this.apiResponse.message == 'Comments list') {
          this.commentList = this.apiResponse.data;
          this.commonService.hideLoader();
        }
        else {
          this.commentList = [];
          this.commonService.hideLoader();
        }
      });
  }

  enableSendButton(){
    if(this.user_comment == "" || this.user_comment == null || this.user_comment == undefined)
    this.checkComment = true; 
    else 
    this.checkComment = false; 
  }

  addComment(itemDetail: any) {
    var userid = this.commonService.getCookieValues("userid");
    if (userid) {
      if (this.user_comment != "") {
        var comment = { 
          commentDescription : this.user_comment , 
          taskId : itemDetail.taskId != undefined ? itemDetail.taskId : itemDetail.id,
          userId : userid
        };
        this.commonService.showLoader();
        this.httpService.postComment(comment).subscribe(
          data => {
            this.apiResponse = data;
            if (this.apiResponse.message == 'Reply added successfully.') {
              this.commonService.hideLoader();
              this.user_comment = ""; 
              this.getAllComments(itemDetail.taskId != undefined ? itemDetail.taskId : itemDetail.id);
            } else {
              this.commonService.hideLoader();
            }
          });
      }
    }
  }

}
