import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';
import { MyTaskComponent } from '../my-task/myTask.component';
import { HttpService } from '../services/http.service';
import { CommonService } from '../services/common.service';
import { Comment } from '../browsetask/comment';
import { DatePipe } from '@angular/common';
import { DatepickerModule } from 'angular2-material-datepicker';
import { ReversePipe } from '../pipes/reversePipes';
import { DataService } from '../services/data.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  providers: [HttpService, CommonService, ReversePipe, DatePipe]
})
export class TaskDetailComponent implements OnInit {
  @Input() data;
  @Input() indicator;
  @Output() someEvent = new EventEmitter<string>();
  @Output() deleteTask = new EventEmitter<string>();
  parentComponent: any;
  task: any;
  apiResponse: any;
  itemDetail: any;
  offerList: any;
  commentList: any;
  commentIndicator: boolean;
  repliedObjectList: any;
  anchorDisable: boolean;
  comment: any;
  replyCommentDesc: string;
  anchorReplyDisable: boolean;
  taskStatusIndicator: boolean;
  userImage: any;
  userId: any;
  taskStatus: any;
  taskDetails: any;
  showForm: boolean;
  showOfferDetailIndicator: boolean;
  taskInfo: any;
  editOffer: boolean;
  offerInfo: any;
  reportTaskIndicator: boolean;
  messages: any;
  messageData: any;
  paymentIndicator: any;
  molPayValues: any;
  taskDoer: any;
  showFeedback: boolean;
  rating: any;
  review: any;
  feedbackError: any;
  hideStatus: boolean;
  feedbackRating: any;
  minLenIndicator: boolean;
  errorIndicator: boolean;
  Arr = Array;
  posterPayablePrice: any;
  constructor(private inj: Injector, private httpService: HttpService, private commonService: CommonService, private reversePipe: ReversePipe, private datePipe: DatePipe,
    private dataService: DataService) {
    this.parentComponent = this.inj.get(MyTaskComponent);
  }

  ngOnInit() {
    this.comment = {};
    this.showForm = false;
    this.showOfferDetailIndicator = false;
    this.reportTaskIndicator = false;
    this.editOffer = false;
    this.paymentIndicator = false;
    this.showFeedback = false;
    this.feedbackError = false;
    this.hideStatus = false;
    var date = new Date(this.parentComponent.taskData.dueDate);
    this.taskInfo = this.parentComponent.taskData;
    this.taskInfo.dueDate = date;
    this.minLenIndicator = false;
    this.errorIndicator = false;
    $('#myModal6').modal({ backdrop: 'static', keyboard: false }, 'show')
    this.task = this.parentComponent.taskData;
    this.taskDetails = this.parentComponent;
    this.userImage = this.commonService.getCookieValues("userImage");
    this.userImage = this.userImage != 'null' && this.userImage != '' ? this.userImage : 'assets/img/task-person.png';
    this.userId = this.commonService.getCookieValues("userid");
    this.taskStatusIndicator = this.task.status == 'open' ? false : true;
    this.taskStatus = this.task.status;

    this.comment = new Comment();
    var taskId = this.task.taskId != undefined ? this.task.taskId : this.task.id;
    this.getAllComments(taskId);
    this.getMessages(taskId);
    this.httpService.userList(taskId).subscribe(
      data => {
        this.apiResponse = data;
        this.commonService.showLoader();
        if (this.apiResponse.message == 'Task offer list') {
          this.offerList = this.apiResponse.data[0].offer_details;
          this.taskDoer = this.apiResponse.data[0].seeker_user_detail;
          this.commonService.hideLoader();
        }
        else {
          this.commonService.hideLoader();
        }
      });
  }
  getAllComments(taskId) {
    this.commonService.showLoader();
    this.httpService.getAllComment(taskId).subscribe(
      data => {
        this.apiResponse = data;
        this.commonService.showLoader();
        if (this.apiResponse.message == 'Comments list') {
          this.commentIndicator = true;
          this.commentList = this.apiResponse.data;
          this.commonService.hideLoader();
        }
        else {
          this.commentIndicator = false;
          this.commentList = [];
          this.commonService.hideLoader();
        }
      });
  }

  checkIfReplyExists(id: any, List: any) {
    this.repliedObjectList = {};
    this.repliedObjectList = List.filter(x => x.commentId === id);
    if (this.repliedObjectList.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }
  onReply(item) {
    $('#item_' + item.id).show();
    this.anchorDisable = true;
  }
  replyComment(commentDesc: string, itemDetail: any, commentId) {
    var userid = this.commonService.getCookieValues("userid");
    if (!userid) {
      $('#taskDescriptionModal').modal('hide');
      this.parentComponent.openLoginPromptPopup();
    } else {
      this.commonService.showLoader();
      this.comment = {};
      this.comment.commentDescription = commentDesc;
      this.comment.taskId = itemDetail.id;
      this.comment.userId = this.commonService.getCookieValues("userid");
      this.comment.commentId = commentId;
      this.httpService.replyComment(this.comment).subscribe(
        data => {
          this.apiResponse = data;
          if (this.apiResponse.message == 'Comment replied!') {
            this.commonService.hideLoader();
            this.replyCommentDesc = "";
            this.getAllComments(this.comment.taskId);
            this.comment = {};
          } else {
            this.commonService.hideLoader();
          }
        });
    }
  }

  addComment(model: any, itemDetail: any) {
    var userid = this.commonService.getCookieValues("userid");

    if (!userid) {
      $('#taskDescriptionModal').modal('hide');
      this.parentComponent.openLoginPromptPopup();
    } else {
      if (model.commentDescription) {
        this.comment.commentDescription = model.commentDescription;
        this.comment.taskId = itemDetail.taskId != undefined ? itemDetail.taskId : itemDetail.id;
        this.comment.userId = this.commonService.getCookieValues("userid");
        this.commonService.showLoader();
        this.httpService.postComment(this.comment).subscribe(
          data => {
            this.apiResponse = data;
            if (this.apiResponse.message == 'Reply added successfully.') {
              this.commonService.hideLoader();
              //get comment list
              this.comment = {};
              this.getAllComments(itemDetail.taskId != undefined ? itemDetail.taskId : itemDetail.id);
            } else {
              this.commonService.hideLoader();
            }
          });
      }
    }
  }

  addCommentChange(event) {
    if (this.comment.commentDescription && this.comment.commentDescription != "") {
      this.anchorDisable = false;
    }
    else {
      this.anchorDisable = true;
    }
  }

  addCommentReplyChange(event) {
    if (event != "") {
      this.anchorReplyDisable = false;
    }
    else {
      this.anchorReplyDisable = true;;
    }
  }

  assignTask(task, list) {
    var config = this.dataService.getConfigData();
    if (task.funded_by_poster == 'Yes' || (config && config.payment_status == 'disable')) {
      var userid = this.commonService.getCookieValues("userid");
      var param = {
        taskOwnerID: userid,
        taskDoerID: list.interested_user[0].id,
        taskId: task.taskId != undefined ? task.taskId : task.id,
        status: 'assigned'
      }
      this.httpService.assignTask(param).subscribe(
        data => {
          this.apiResponse = data;
          this.commonService.showLoader();
          if (this.apiResponse.message == 'Task Assigned successfully') {
            alert('Task Assigned successfully');
            //this.commentIndicator = true;
            //  this.commentList = this.apiResponse.data;
            this.closePopup();
            this.someEvent.next('postedTask');
            this.commonService.hideLoader();
          }
          else {
            alert('Task already assigned !');
            this.commentIndicator = false;
            this.commonService.hideLoader();
          }
        });
    } else {
      let userId = this.commonService.getCookieValues("userid");
      // this.posterPayablePrice = list.offerPrice;
      var param1 = {
        userId: userId,
        taskId: task.taskId != undefined ? task.taskId : task.id,
        amount: task.totalAmount
      }
      this.httpService.makePayment(param1).subscribe(
        data => {
          this.paymentIndicator = true;
          this.apiResponse = data;
          if (this.apiResponse.message == 'Success') {
            this.molPayValues = this.apiResponse.data;
            this.paymentIndicator = true;
          } else {
            this.molPayValues == [];
          }
        });
    }

  }
  closePopup() {
    $('#myModal6').modal('hide');
    this.parentComponent.taskDetail = false;
    this.paymentIndicator = false;
  }
  //delete comment
  deleteComment(id, taskId, userId) {
    this.commonService.showLoader();
    var param = {
      id: id,
      taskId: taskId,
      userId: userId
    }
    this.httpService.deleteComment(param).subscribe(
      data => {
        this.apiResponse = data;
        if (this.apiResponse.message == 'Comment deleted successfully.') {
          this.getAllComments(taskId);
          this.commonService.hideLoader();
          alert('comment deleted successfully');
        }
        else {
          this.getAllComments(taskId);
          this.commonService.hideLoader();
        }
      });
  }
  showEditForm() {
    $('#collapse1').addClass('in');
    this.showForm = true;
  }
  closeForm() {
    $('#collapse1').removeClass('in');
    this.showForm = false;
  }
  showOfferDetail() {
    this.showOfferDetailIndicator = true;
  }
  submitForm(model: any, isValid: boolean) {
    if (isValid && this.minLenIndicator == false) {
      var date = new Date(this.taskInfo.dueDate);
      var param = {
        taskId: this.taskInfo.id,
        title: model.title,
        description: model.description,
        locationType: model.locationType,
        dueDate: date,
        budgetType: model.budgetType,
        totalAmount: model.totalAmount,
        address: model.address

      }
      this.httpService.updatePostTask(param).subscribe(
        data => {
          this.apiResponse = data;
          this.commonService.showLoader();

          if (this.apiResponse.message == 'Task  updated successfully.') {
            this.commonService.hideLoader();
            this.showForm = false;
            $('#collapse1').removeClass('in');
            alert('Task  updated successfully');
          }
          else {
            this.commonService.hideLoader();
          }
        });
    } else {
      if (model.description.length <= 25) {
        this.minLenIndicator = true;
        this.errorIndicator = isValid == true ? false : true;
      }
      else

        this.errorIndicator = true;
    }

  }
  onChangeLocation(e) {
    this.taskInfo.locationType = e;
  }
  onChangeBudget(e) {
    this.taskInfo.budgetType = e;
  }
  deleteOffer(offerId, taskId) {
    this.commonService.showLoader();
    var userId = this.commonService.getCookieValues('userid');
    var param = {
      userId: userId,
      offerId: offerId,
      taskId: taskId
    }
    this.httpService.deleteOffer(param).subscribe(
      data => {
        this.apiResponse = data;
        if (this.apiResponse.message == 'offer deleted successfully') {
          var index = this.offerList.findIndex(x => x.id == offerId);
          if (index > -1) {
            this.offerList.splice(index, 1);
          }
          this.commonService.hideLoader();
          alert('offer deleted successfully');
          $('#myModal6').modal('hide');
          this.parentComponent.taskDetail = false;
          this.someEvent.next('offerPending');
        }
        else {
          this.commonService.hideLoader();
        }
      });
  }
  offerEdit(offerDetail) {
    this.offerInfo = offerDetail;
    this.editOffer = true;
  }
  updateOffer(model: any, isValid: boolean) {
    this.commonService.showLoader();
    var param = {
      comment: model.comment,
      offerPrice: model.offerPrice,
    }
    var id = this.offerInfo.id;
    this.httpService.updateOffer(param, id).subscribe(
      data => {
        this.apiResponse = data;
        if (this.apiResponse.message == 'Offer updated successfully.') {
          this.commonService.hideLoader();
          this.editOffer = false;
          alert('Offer updated successfully.');
        }
        else {
          this.commonService.hideLoader();
        }
      });
  }
  closeOfferForm() {
    $('#collapse5').removeClass('in');
    this.editOffer = false;
  }
  reportTask() {
    var userid = this.commonService.getCookieValues("userid");
    this.reportTaskIndicator = true;
    if (!userid) {
      $('#myModal6').modal('hide');
      this.parentComponent.openLoginPromptPopup();
    } else {
      $('#myModal6').modal('hide');
      $('#ReportTaskModal').modal({ backdrop: 'static', keyboard: false }, 'show');
    }
  }
  addMessage(model: any, taskDetail: any) {
    this.commonService.showLoader();
    var taskId = taskDetail.taskId != undefined ? taskDetail.taskId : taskDetail.id;
    var userId = this.commonService.getCookieValues("userid");
    var param = {
      taskId: taskId,
      userId: userId,
      comments: model
    }
    this.httpService.sendPersonalMessage(param).subscribe(
      data => {
        this.apiResponse = data;
        if (this.apiResponse.message == 'Message added successfully.') {
          this.messages = '';
          this.getMessages(taskId);
          this.commonService.hideLoader();
        }
        else {
          this.commonService.hideLoader();
        }
      });
  }
  getMessages(taskId) {
    this.commonService.showLoader();
    this.httpService.getPersonalMessage(taskId).subscribe(
      data => {
        this.apiResponse = data;
        if (this.apiResponse.message == 'Message found') {
          this.messageData = this.apiResponse.data;
          this.commonService.hideLoader();
        }
        else {

          this.commonService.hideLoader();
        }
      });
  }
  submitReviewRating(rating: any, review: any, taskDetail: any) {
    if (rating && review) {
      this.commonService.showLoader();
      var param = {};
      var userId = this.commonService.getCookieValues("userid");
      if (this.taskDetails.postedTaskIndicator) {
        param = {
          taskId: taskDetail.taskId != undefined ? taskDetail.taskId : taskDetail.id,
          posterReview: review,
          posterRating: rating,
          posterUserId: userId
        }
      } else {
        param = {
          taskId: taskDetail.taskId != undefined ? taskDetail.taskId : taskDetail.id,
          doerReview: review,
          doerRating: rating,
          taskDoerId: userId
        }
      }

      this.httpService.submitReviewRating(param).subscribe(
        data => {
          this.apiResponse = data;
          if (this.apiResponse.message == 'Feedback submitted successfully') {
            this.rating = '';
            this.review = '';
            this.feedbackRating = [];
            this.commonService.hideLoader();
            this.feedbackError = false;
          }
          else {
            this.commonService.hideLoader();
          }
        });
    } else {
      this.feedbackError = true;
    }

  }
  onChangeRating(e) {
    this.feedbackRating = [];
    e = e == undefined ? 5 : e;
    for (var i = 1; i <= e; i++) {
      this.feedbackRating.push(i);
    }
  }
  onChange(e, taskDetail, prevStatus) {

    var param = {
      taskId: taskDetail.taskId != undefined ? taskDetail.taskId : taskDetail.id,
      taskDoerId: taskDetail.taskDoerId,
      status: e
    }
    if (e) {
      var r = confirm("Do you want to change the status ?");
      if (r == true) {
        this.httpService.changeStatus(param).subscribe(
          data => {
            this.apiResponse = data;
            if (this.apiResponse.message == 'Task completed successfully from doer') {
              console.log('e', param.status);
              this.commonService.hideLoader();
              this.hideStatus = param.status == 'completed' || param.status == 'completed from doer' ? true : false;;
              this.task.status = param.status;
              this.showFeedback = param.status == 'completed' ? true : false;
              $('#collapseFeedback').addClass('in');

            }
            else {
              this.commonService.hideLoader();
            }
          });
      } else {
        console.log('confirm')
        this.taskStatus = prevStatus;
        this.hideStatus = false;
      }
    } else if (e != '') {
      this.httpService.changeStatus(param).subscribe(
        data => {
          this.apiResponse = data;
          if (this.apiResponse.message == 'Task completed successfully from doer') {
            this.commonService.hideLoader();
            this.task.status = param.status;
            this.hideStatus = (param.status == 'closed' || param.status == 'reopen') ? true : false;
            this.showFeedback = (param.status == 'closed' || param.status == 'reopen') ? true : false;
            $('#collapseFeedback').addClass('in');
          }
          else {
            this.commonService.hideLoader();
          }
        });
    }
  }
  openMessage() {
    $('#collapse4').addClass('in');
  }
  confrimDelete(id) {
    $('#myModal6').modal('hide');
    this.parentComponent.taskDetail = false;
    this.deleteTask.next(id);
  }
}
