import { Component , OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import {AppComponent} from '../app.component';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';
import {ReversePipe} from '../pipes/reversePipes';
import { DatePipe } from '@angular/common';
import { DatepickerModule } from 'angular2-material-datepicker';
import {ActivatedRoute,Router} from '@angular/router';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'routing-root',
  templateUrl: './myTask.component.html',
  providers: [HttpService, CommonService, ReversePipe,DatePipe] 
})
export class MyTaskComponent  implements OnInit {
  parentComponent : any;
  apiResponse : any;
  TaskList: any;
  saveTaskList: any;
  postedTaskList:any;
  offerTaskList: any;
  assignedTaskList: any;
  userDetail: any;
  itemDetail: any;
  anchorDisable: any;
  offerList: any;
  anchorReplyDisable: any;
  comment: any;
  deleteTask:any;
  deleteOffer: any;
  deleteOfferIndicator: boolean;
  commentList: object;
  commentIndicator : boolean;
  replyIndicator : boolean;
  repliedObjectList : any ;
  savedTaskIndicator : boolean;
  postedTaskIndicator :boolean;
  offerTaskIndicator : boolean;
  offerAssignedTaskIndicator : boolean;
  taskDetail: boolean;
  taskData: any;
  reasonList : any;
  Arr = Array;
  query : any;
  constructor(private inj:Injector, private httpService: HttpService, private commonService: CommonService,private reversePipe: ReversePipe,private datePipe: DatePipe,private router:Router, private route: ActivatedRoute){
    this.parentComponent = this.inj.get(AppComponent);
    this.query = "";
  }
  ngOnInit() {
    var redirectFromDashboard=this.commonService.getCookieValues('taskType');
    window.scrollTo(0,0);
    if(redirectFromDashboard) {
      this.showTask(redirectFromDashboard);
      this.savedTaskIndicator = false;
      this.postedTaskIndicator=redirectFromDashboard=='postedTask'?true:false;
      this.offerTaskIndicator=redirectFromDashboard=='offerPending'?true:false;
      this.offerAssignedTaskIndicator=redirectFromDashboard=='offerAccepting'?true:false;
      this.taskDetail=false;
      this.commonService.deleteCookieValues('taskType');
    } else{
      this.showTaskList('saveTask');
      this.savedTaskIndicator = true;
      this.postedTaskIndicator=false;
      this.offerTaskIndicator=false;
      this.offerAssignedTaskIndicator=false;
      this.taskDetail=false;
    }

  }
  removeFilter()
  {
    this.query = "";
  }
  showTaskList(listType){
    var userId=this.commonService.getCookieValues("userid");
    if(!userId) {
      this.router.navigate(['./']);
      this.parentComponent.openLoginPromptPopup();
    } else {
      this.commonService.showLoader();
      
       this.httpService.getPostedTask(userId,listType).subscribe(
         data => {
           this.apiResponse = data;
           if(this.apiResponse.message == 'All task list')
           {
               this.saveTaskList=this.apiResponse.data.save_task[0].save_task;
               this.TaskList=this.apiResponse.data.save_task[0].save_task;
             //  if(this.apiResponse.data[0].posted_task)
              // this.postedTaskList=this.apiResponse.data[0].posted_task;
               //static data 
              // this.postedTaskList[0].status = "open";
             //  this.postedTaskList[1].status = "reopen";
              // this.postedTaskList[2].status = "assigned";
              // this.postedTaskList[3].status = "closed";
              // this.postedTaskList[4].status = "completed-from-doer";
               //this.postedTaskList[5].status = "expired";
            //   this.offerTaskList=this.apiResponse.data[0].offer_task;
             //  this.assignedTaskList=this.apiResponse.data[0].assigned_task;
               this.userDetail=this.apiResponse.data.save_task[0];
               this.commonService.hideLoader();
           }
           else{
              this.commonService.hideLoader();
           }
       }); 

    }
   
  }
  navigateToBrowseTask(taskList)
  {
    if(taskList.status=='open')
    this.router.navigate(['./browse-task/',taskList.taskId]);
  }
  showTask(listType){
    this.commonService.showLoader();
    this.removeFilter(); 
    this.query = "";
    if(listType=='saveTask'){
      this.savedTaskIndicator=true;
      this.postedTaskIndicator=false;
      this.offerTaskIndicator=false;
      this.offerAssignedTaskIndicator=false;
      var userId=this.commonService.getCookieValues("userid");
      this.httpService.getPostedTask(userId,listType).subscribe(
        data => {
          this.apiResponse = data;
          if(this.apiResponse.message == 'All task list')
          {
              this.TaskList=this.apiResponse.data.save_task[0].save_task;;
              this.commonService.hideLoader();
          }
          else{
             this.commonService.hideLoader();
          }
      });
    } else if(listType=='postedTask'){
      this.postedTaskIndicator=true;
      this.offerTaskIndicator=false;
      this.savedTaskIndicator=false;
      this.offerAssignedTaskIndicator=false;
      var userId=this.commonService.getCookieValues("userid");
      this.httpService.getPostedTask(userId,listType).subscribe(
        data => {
          this.apiResponse = data;
          if(this.apiResponse.message == 'All task list')
          {
              this.TaskList=this.apiResponse.data.postedTask[0].posted_task;
              this.commonService.hideLoader();
          }
          else{
             this.commonService.hideLoader();
          }
      });
    } else if(listType=='offerPending') {
      this.offerTaskIndicator=true;
      this.postedTaskIndicator=false;
      this.savedTaskIndicator=false;
      this.offerAssignedTaskIndicator=false;
      var userId=this.commonService.getCookieValues("userid");
      this.httpService.getPostedTask(userId,listType).subscribe(
        data => {
          this.apiResponse = data;
          if(this.apiResponse.message == 'All task list')
          {
              this.TaskList=this.apiResponse.data.offers_pending[0].offers_pending;
              this.commonService.hideLoader();
          }
          else{
             this.commonService.hideLoader();
          }
      });
    } else if(listType=='offerAccepting'){
      this.offerAssignedTaskIndicator=true;
      this.offerTaskIndicator=false;
      this.postedTaskIndicator=false;
      this.savedTaskIndicator=false;
      var userId=this.commonService.getCookieValues("userid");
      this.httpService.getPostedTask(userId,listType).subscribe(
        data => {
          this.apiResponse = data;
          if(this.apiResponse.message == 'All task list')
          {
              this.TaskList=this.apiResponse.data.offers_accepting[0].offers_accepting;
              this.commonService.hideLoader();
          }
          else{
             this.commonService.hideLoader();
          }
      });
      this.TaskList=this.assignedTaskList;
    }
  }
  showTaskDescription(item)
  {

    var userid = this.commonService.getCookieValues("userid");
    if(!userid) {
      this.parentComponent.openLoginPromptPopup();
    } else {
        this.itemDetail = item;
        this.comment = new Comment();
        this.getAllComments(this.itemDetail.id);
        this.anchorDisable = true;
        this.anchorReplyDisable= true;
        this.itemDetail = item;
            var taskId = this.itemDetail.id;
            this.httpService.userList(taskId).subscribe(
              data => {
                this.apiResponse = data;
                this.commonService.showLoader();
                console.log('item',this.itemDetail);
                if(this.apiResponse.message == 'Task offer list')
                {
                  this.offerList=this.apiResponse.data[0].interested_users;
                  this.commonService.hideLoader();
                }
                else{
                   this.commonService.hideLoader();
                }
            });
        $('#taskDescriptionModal').modal({backdrop: 'static', keyboard: false},'show');
    }
  }
  getAllComments(taskId)
  {
    this.httpService.getAllComment(taskId).subscribe(
      data => {
        this.apiResponse = data;
        this.commonService.showLoader();
        if(this.apiResponse.message == 'Comments list')
        {
          this.commentIndicator = true;
          this.commentList = this.apiResponse.data;
          this.commonService.hideLoader();
          console.log(this.commentList);
        }
        else{
           this.commentIndicator = false;
           this.commonService.hideLoader();
        }
    });
  }
  checkIfReplyExists(id : any, List :any)
  {
    this.repliedObjectList = {};
    this.repliedObjectList = List.filter(x => x.commentId === id);
    if( this.repliedObjectList.length > 0 )
    {
      return true;
    }
    else{
      return false;
    }
  }
  //delete saved task
  deleteSavedtask(){
    this.commonService.showLoader();
    var userId=this.commonService.getCookieValues("userid");
    var param={
      taskId : this.deleteTask,
      userId : userId
      }
    if(this.postedTaskIndicator==true) {
      this.httpService.deletePostedTask(this.deleteTask).subscribe(
        data => {
          this.apiResponse = data;
          if(this.apiResponse.message == 'Post deleted successfully.')
          {
               var index = this.TaskList.findIndex(x => x.id==this.deleteTask);
                  if (index > -1) {
                    this.TaskList.splice(index, 1);
                }
            $("#confirmDelete").modal('hide');        
            this.commonService.hideLoader();
          }
          else{
             this.commonService.hideLoader();
          }
      }); 
    } else {
      this.httpService.deleteSavedTask(param).subscribe(
        data => {
          this.apiResponse = data;
          if(this.apiResponse.message == 'Save Task deleted successfully.')
          {
               var index = this.TaskList.findIndex(x => x.taskId==this.deleteTask);
                  if (index > -1) {
                    this.TaskList.splice(index, 1);
                }
            $("#confirmDelete").modal('hide');        
            this.commonService.hideLoader();
          }
          else{
             this.commonService.hideLoader();
          }
      }); 
    }
  
  }
  confrimDelete(savedTaskId){
    $("#confirmDelete").modal({backdrop: 'static', keyboard: false},'show');
    this.deleteTask=savedTaskId;
  }
  confrimDeleteOffer(offerTaskId,pendingTaskId){
    this.deleteOfferIndicator=true;
    $("#confirmDelete").modal({backdrop: 'static', keyboard: false},'show');
    var userId=this.commonService.getCookieValues("userid");
    this.deleteOffer={
      userId : userId,
      offerId: offerTaskId,
      taskId : pendingTaskId
      }
  }
  deleteOffertask(){
    this.commonService.showLoader();
 
    var param=this.deleteOffer;
    this.httpService.deleteOffer(param).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'offer deleted successfully')
        {
             var index = this.TaskList.findIndex(x => x.taskId==this.deleteOffer.taskId);
                if (index > -1) {
                  this.TaskList.splice(index, 1);
              }
          $("#confirmDelete").modal('hide');    
          this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
    }); 
  }
  openTaskDetail(task){
    this.taskDetail=true;
    this.taskData=task;
  }
  openReadmore(taskList){
    if(this.postedTaskIndicator||this.offerTaskIndicator||this.offerAssignedTaskIndicator){
      this.openTaskDetail(taskList);
    } else {
      this.router.navigate(['./browse-task/',taskList.taskId]);
    }
  }
}