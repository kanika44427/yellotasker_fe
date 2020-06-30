import { Component , OnInit, Input} from '@angular/core';
import { HttpService } from '../services/http.service';
import { CommonService } from '../services/common.service';
import {ReversePipe} from '../pipes/reversePipes';
import {Comment} from './comment';
import {Offer} from './offer';
import {Injector} from '@angular/core';
import {AppComponent} from '../app.component';
import { DatePipe } from '@angular/common';
import { DatepickerModule } from 'angular2-material-datepicker';
import {ActivatedRoute,Router} from '@angular/router';
import {MyTaskComponent} from './../my-task/myTask.component';
import {SearchPipe} from '../pipes/search.pipe'
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'routing-root',
  templateUrl: './browsetask.component.html',
  providers: [HttpService, CommonService, ReversePipe,DatePipe,MyTaskComponent]
})
export class BrowseTaskComponent implements OnInit{
  apiResponse : any;
  pageNum : number;
  taskList : any;
  itemDetail : any;
  comment: any;
  offerObject :any;
  saveJobObject :any;
  offerList: any;
  commentList : object;
  taskListIndicator : boolean;
  commentIndicator : boolean;
  replyIndicator : boolean;
  errorIndicator : boolean;
  parentComponent : any; 
  anchorDisable : boolean;
  anchorReplyDisable : boolean;
  replyCommentDesc : string;
  repliedObjectList : any ;
  minReqValIndicator : boolean;
  offer : any;
  taskTitle : any;
  tId: any;
  taskId: object;
  postTaskDetail: any;
  serviceCharge:any;
  netServiceCharge:any;
  loggedIndicator:boolean;
  categoryList:any;
  userImage:any;
  latestTask:boolean;
  taskByDueDate:boolean;
  taskByBudget:boolean;
  taskByLocation:boolean;
  taskByCategory:boolean;
  taskByBookmark:boolean;
  currentMenuSelected = 'latest';
  userId:any;
  query : any;
  offerPostSuccess:boolean;
  seeMoreIndicator : boolean;
  Arr = Array;
  repoUrl : string; 
  //Filter SEction 
  budgetTypeFilter = 'withMaterial'; 
  TaskbyTimeIndicator = ''; 
  TaskbyBudgetIndicator = '';  
  constructor(private inj:Injector,private httpService: HttpService, private commonService: CommonService,
  private reversePipe: ReversePipe,private datePipe: DatePipe,private route:ActivatedRoute,private router:Router){
    this.parentComponent = this.inj.get(AppComponent);
  }

  getMenuLatest(type){
    this.currentMenuSelected = type; 
    if(this.currentMenuSelected != 'dueDate'){
      this.TaskbyTimeIndicator = ""; 
    }
    if(this.currentMenuSelected != 'budget'){
      this.TaskbyBudgetIndicator = '';
    }
  }

  ngOnInit() {
    this.seeMoreIndicator = true;
    this.comment = {};
    this.query = "";
    this.pageNum = 1;
    this.getServiceCharge();
    this.offerPostSuccess=false;
    var userid = this.commonService.getCookieValues("userid");
    this.userId=this.commonService.getCookieValues("userid");
    this.userImage=this.commonService.getCookieValues("userImage");
    this.loggedIndicator=userid?true:false;
    this.route.params.subscribe( params =>
      this.taskId = params['id']
    )
    this.anchorDisable = true;
    this.anchorReplyDisable = true;
    this.httpService.getCategory().subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Category dashboard list')
        {
          this.categoryList=this.apiResponse.data;
        } 
      });
    this.offer = new Offer();
     this.commonService.showLoader();
     $('#taskDescriptionModal').modal('hide');
     $(".modal-backdrop").remove();
     this.httpService.browseAllItems(this.pageNum).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'List of tasks.')
        {
          this.reversePipe.transform(this.apiResponse.data);
          this.latestTask=true;
          this.taskList = this.apiResponse.data;
          if(this.taskId){
            this.httpService.getPostTaskById(this.taskId).subscribe(
              data => {
                this.postTaskDetail = data;
                if(this.postTaskDetail.message == 'List of tasks.')
                {
                  this.showTaskDescription(this.postTaskDetail.data[0]);
                  this.commonService.hideLoader();
                } else {
                  this.commonService.hideLoader();
                }
            });
          }
          this.taskListIndicator = true;
          this.commonService.hideLoader();
        }
    });
  }
  getServiceCharge(){
    this.httpService.getServiceCharges().subscribe(data => {
      this.apiResponse = data;
      if(this.apiResponse.message == "Service charge")
      {
        this.netServiceCharge = this.apiResponse.data.field_value;
      }
    });
  //this.serviceCharge=(e.target.value*0.10).toFixed(2);
  }

  applyDueDate(){
    
    this.commonService.showLoader();
    this.httpService.getLatestTask().subscribe(
      data => {
        this.apiResponse = data;
        this.taskList=this.apiResponse.data;
      }); 
  }

getLatestTask(){
  this.commonService.showLoader();
  this.httpService.getLatestTask().subscribe(
    data => {
      this.apiResponse = data;
      if(this.apiResponse.message == 'List of tasks.')
      { 
        this.taskByBudget=false;
        this.taskByDueDate=false;
        this.taskByCategory=false;
        this.taskByLocation=false;
        this.taskByBookmark=false;
        this.latestTask=true;
        this.taskList=this.apiResponse.data;
        this.commonService.hideLoader();
      }
      else{
         this.taskList=[];
         this.commonService.hideLoader();
      }
  }); 
}
startFollowing(){
  console.log('here');
  // this.httpService.postComment(this.comment).subscribe(
  //   data => {
  //     this.apiResponse = data;
  //     if(this.apiResponse.message == 'Reply added successfully.')
  //     {
  //       //get comment list
  //       this.comment = {};
  //       this.getAllComments(itemDetail.id);
  //     }
  // });
}
//get task by time
getTaskbyTime(time){
  this.TaskbyTimeIndicator = time; 
  this.commonService.showLoader();
  this.httpService.getTaskbyTime(time).subscribe(
    data => {
      this.apiResponse = data;
      if(this.apiResponse.message == 'List of tasks.')
      { 
        this.taskByBudget=false;
        this.taskByDueDate=true;
        this.taskByCategory=false;
        this.taskByLocation=false;
        this.taskByBookmark=false;
        this.latestTask=false;
        this.taskList=this.apiResponse.data;
        this.commonService.hideLoader();
      }
      else{
         this.taskList=[];
         this.commonService.hideLoader();
      }
  }); 
}
//get task by time
getTaskbyBookmark(){
  this.commonService.showLoader();
  var userId=this.commonService.getCookieValues('userid');
  var taskType='saveTask';
  this.httpService.getPostedTask(userId,taskType).subscribe(
    data => {
      this.apiResponse = data;
      if(this.apiResponse.message == 'All task list')
      {
        if(this.apiResponse.data['save_task'] && this.apiResponse.data['save_task'].length > 0 ){ 
        this.taskList= this.apiResponse.data['save_task'][0].save_task;
        }
        else{
          this.taskList = []; 
        }
        this.commonService.hideLoader();
      }
      else{
         this.taskList=[];
         this.commonService.hideLoader();
      }
      this.taskByBudget=false;
      this.taskByDueDate=false;
      this.taskByCategory=false;
      this.taskByLocation=false;
      this.latestTask=false;
      this.taskByBookmark=true;
  }); 
}
// get task by budget
getTaskbyBudget(budgetType){
  this.TaskbyBudgetIndicator = budgetType; 
  this.commonService.showLoader();
  if(budgetType){
    var budget = budgetType.split("-");
    var budgetQueryStr = '?budgetmin='+ budget[0]+'&budgetmax='+ (budget[1] ? budget[1] : 100000);
    if(this.budgetTypeFilter == 'withMaterial')
    budgetQueryStr = budgetQueryStr + '&budgetType=' + "Materials & workmanship";
    else 
    budgetQueryStr = budgetQueryStr + '&budgetType=' + "Workmanship only - I will supply materials";
    this.httpService.getTaskbyBudget(budgetQueryStr).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'List of tasks.')
        { 
        
          this.taskList=this.apiResponse.data;
          this.commonService.hideLoader();
        }
        else{
           this.taskList=[];
           this.commonService.hideLoader();
        }
    }); 
  }
}
//get task by location
getTaskbyLocation(type){
  this.commonService.showLoader();
  var param={
    locationType:type
  }
  this.httpService.getPostedTaskByLocation(type).subscribe(
    data => {
      this.apiResponse = data;
      if(this.apiResponse.message == 'List of tasks.')
      { 
        this.taskList=this.apiResponse.data;
        this.commonService.hideLoader();
      }
      else{
         this.taskList=[];
         this.commonService.hideLoader();
      }
  }); 
}
  showTaskDescription(item)
  {

    var userid = this.commonService.getCookieValues("userid");
   // if(!userid) {
     // this.parentComponent.openLoginPromptPopup();
  //  } else {
        this.itemDetail = item;
        this.comment = new Comment();
        this.getAllComments(this.itemDetail.id);
        this.anchorDisable = true;
        this.anchorReplyDisable= true;
        this.itemDetail = item;
        this.repoUrl = 'yellotasker.com/#/browse-task/' + this.itemDetail.id;
            var taskId = this.itemDetail.id;
            this.httpService.userList(taskId).subscribe(
              data => {
                this.apiResponse = data;
                this.commonService.showLoader();
                if(this.apiResponse.message == 'Task offer list')
                { 
                  this.offerList=this.apiResponse.data[0].offer_details;
                  this.commonService.hideLoader();
                }
                else{
                   this.commonService.hideLoader();
                }
            });
        $('#taskDescriptionModal').modal({backdrop: 'static', keyboard: false},'show');
   // }
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
        }
        else{
           this.commentIndicator = false;
           this.commonService.hideLoader();
        }
    });
  }

  onReply(item)
  {
    $('#item_'+ item.id).show();
    this.anchorDisable = true;
  }

  replyComment(commentDesc : string, itemDetail : any, commentId)
  {
    var userid = this.commonService.getCookieValues("userid");
    if(!userid) {
          $('#taskDescriptionModal').modal('hide');
          this.parentComponent.openLoginPromptPopup();
    } else {
          this.comment = {};
          this.comment.commentDescription = commentDesc;
          this.comment.taskId = itemDetail.id;
          this.comment.userId = this.commonService.getCookieValues("userid");
          this.comment.commentId = commentId;
           this.httpService.replyComment(this.comment).subscribe(
            data => {
              this.apiResponse = data;
              if(this.apiResponse.message == 'Comment replied!')
              {
      
                this.replyCommentDesc = "";
                this.getAllComments(this.comment.taskId);
                this.comment = {};
              }
          });
        }
  }

  getMoreItems()
  {
    this.pageNum = this.pageNum + 1;
    this.taskListIndicator = false;
    this.commonService.showLoader();
     this.httpService.browseAllItems(this.pageNum).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'List of tasks.')
        {
          this.reversePipe.transform(this.apiResponse.data);
          this.taskList = this.taskList.concat(this.apiResponse.data);
          this.taskListIndicator = true;
          this.commonService.hideLoader();
        }
        if(this.apiResponse.message == "No task found.")
        {
          this.taskListIndicator = true;
          this.seeMoreIndicator = false;
          this.commonService.hideLoader();
        }
    });
  }
  addComment(model : any, itemDetail : any)
  {
    var userid = this.commonService.getCookieValues("userid");
    
        if(!userid) {
          $('#taskDescriptionModal').modal('hide');
          this.parentComponent.openLoginPromptPopup();
        } else {
          if(model.commentDescription)
          {
            this.commonService.showLoader();
            this.comment.commentDescription = model.commentDescription;
            this.comment.taskId = itemDetail.id;
            this.comment.userId = this.commonService.getCookieValues("userid");
      
            this.httpService.postComment(this.comment).subscribe(
              data => {
                this.apiResponse = data;
                if(this.apiResponse.message == 'Reply added successfully.')
                {
                  this.commonService.hideLoader();
                  //get comment list
                  this.comment = {};
                  this.getAllComments(itemDetail.id);
                } else {
                  this.commonService.hideLoader();
                }
            });
          }
        }
  }

  addCommentChange(event)
  {
     if(this.comment.commentDescription && this.comment.commentDescription != "")
    {
      this.anchorDisable = false;
    }
    else
    {
       this.anchorDisable = true;
    }
  }

  addCommentReplyChange(event)
  {
     if(event!= "")
    {
      this.anchorReplyDisable= false;
    }
    else
    {
       this.anchorReplyDisable= true;;
    }
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
  showOfferPopup(model : any, isValid : boolean)
  {
    if(model.offerPrice==0){

      this.minReqValIndicator=true;
      this.errorIndicator=false;
      return;
   } else {
      this.minReqValIndicator=false;
   }
    if(isValid) {
      this.errorIndicator = false;
      this.offerObject={};
      this.offerObject.interestedUserId = this.commonService.getCookieValues("userid");
      this.offerObject.taskId = this.itemDetail.id;
      this.offerObject.assignUserId = this.itemDetail.user_detail.id;
      this.offerObject.offerPrice=(+model.offerPrice);
      this.offerObject.serviceCharges=this.netServiceCharge;
      this.offerObject.comment=model.offerComment;
      this.offerObject.completionDate= this.itemDetail.dueDate;
      this.commonService.showLoader();
      this.httpService.offerPosting(this.offerObject).subscribe(
        data => {
          this.apiResponse = data;
          if(this.apiResponse.message == 'Offer posted successfully.')
          {
            this.commonService.hideLoader();
            $('#OfferModalConfirmation').modal('hide');
            this.offerPostSuccess=true;
            $('#OfferModalSuccess').modal({backdrop: 'static', keyboard: false},'show');
            model.commentDescription=model.offerComment;
            this.addComment(model,this.itemDetail);
          }
          else if(this.apiResponse.message == 'Offer already exists.Do you want to update?'){
  
            $('#OfferModalConfirmation').modal('hide');
            $('#OfferAlreadyPosted').modal({backdrop: 'static', keyboard: false},'show');
             this.commonService.hideLoader();
          } else{
               $('#OfferModalConfirmation').modal('hide');
               $('#OfferFail').modal({backdrop: 'static', keyboard: false},'show');
               this.commonService.hideLoader();
            }
      });
    } else {
        this.commonService.hideLoader();
        this.errorIndicator = true;
    
    }
  
  }
  closeForm()
  {
    $('#OfferModalConfirmation').modal('hide');
  }
  showOfferConfirmationPopup(itemDetail)
  {
    var userid = this.commonService.getCookieValues("userid");
    this.comment = new Comment();
    this.offer = new Offer();
    if(!userid) {
      $('#taskDescriptionModal').modal('hide');
      this.parentComponent.openLoginPromptPopup();
    } else {
       this.itemDetail = itemDetail;
       this.offer.offerPrice=itemDetail.totalAmount?+itemDetail.totalAmount:'';
       this.serviceCharge=(itemDetail.totalAmount*(this.netServiceCharge/100)).toFixed(2);
       //this.offer.off
       $('#OfferModalConfirmation').modal({backdrop: 'static', keyboard: false},'show');
       if($('#taskDescriptionModal').hasClass('in'))
          $('#taskDescriptionModal').modal('hide');
          /*var taskId = this.itemDetail.id;
          this.httpService.userList(taskId).subscribe(
            data => {
              this.apiResponse = data;
              this.commonService.showLoader();
              if(this.apiResponse.message == 'Offer posted successfully.')
              {
                $('#OfferModalConfirmation').modal('hide');
                $('#OfferModalSuccess').modal({backdrop: 'static', keyboard: false},'show');
                this.commonService.hideLoader();
                console.log(this.commentList);
              }
              else{
              //   this.commentIndicator = false;
                 this.commonService.hideLoader();
              }
          });*/
     
    }
  }

  reportTask()
  {
    var userid = this.commonService.getCookieValues("userid");

    if(!userid) {
      $('#taskDescriptionModal').modal('hide');
      this.parentComponent.openLoginPromptPopup();
    } else {
      $('#taskDescriptionModal').modal('hide');
      $('#ReportTaskModal').modal({backdrop: 'static', keyboard: false},'show');
    }
  }
  addToSaveJobs(itemDetail)
  {
    let loginId= this.commonService.getCookieValues("userid");
    if(loginId!=null){
      this.saveJobObject={};
      this.itemDetail = itemDetail;
      this.saveJobObject.userId = this.commonService.getCookieValues("userid");
      this.saveJobObject.taskId = this.itemDetail.id;
      this.httpService.saveTask(this.saveJobObject).subscribe(
        data => {
          this.apiResponse = data;
          this.commonService.showLoader();
          if(this.apiResponse.message == 'Saved task offer list')
          {
            $("#SaveJobsSuccess").modal({backdrop: 'static', keyboard: false},'show');
            this.commonService.hideLoader();
          }
          else{
            if(this.apiResponse.message == 'This task already saved.Do you want to update?')
            {
              $('#taskAlreadySaved').modal({backdrop: 'static', keyboard: false},'show');
            }
            this.commonService.hideLoader();
          }
      });
    } else {
      $('#loginPrompt').modal({backdrop: 'static', keyboard: false},'show');
    }
   

  }
  getDate(dueDateType : string )
  {
     if(dueDateType == 'Today')
    {
       var date = new Date;
       this.comment.dueDate = date;
    }
    else  if(dueDateType == 'Tommorow')
      {
        var date = new Date();
        date.setDate(date.getDate() + 1);
        this.comment.dueDate = date;
      }
    else if(dueDateType == 'Within 1 week')
        {
          var date = new Date();
          date.setDate(date.getDate() + 7);
          this.comment.dueDate = date;
        }
    else if(dueDateType == 'By a certain date')
      {
         this.comment.dueDate = new Date;
      }
  }
  closeReadMore(){
    let currentUrl = this.router.url;
    if(currentUrl!='/browse-task') {
      $('#taskDescriptionModal').modal('hide');
    this.router.navigate(['./browse-task']); 
    //check in future
  //  window.location.reload();
  } else {
    $('#taskDescriptionModal').modal('hide');
  }
}
visitProfile(userDetail){
  $('#taskDescriptionModal').modal('hide');
  this.router.navigate(['./profile-view/'+userDetail.first_name+'/'+userDetail.id]);
}
redirect(path){
  $('#OfferModalSuccess').modal('hide');
  this.offerPostSuccess=false;
  this.router.navigate([path]);
}
}
