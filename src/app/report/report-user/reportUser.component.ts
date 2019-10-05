import { Component , OnInit, Input } from '@angular/core';
import { Injector } from '@angular/core';
import {AppComponent} from './../../app.component';
import { CommonService } from './../../services/common.service';
import { HttpService } from './../../services/http.service';
import {MyTaskComponent} from './../../my-task/myTask.component';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'reportUser-popup',
  templateUrl: './reportUser.component.html',
  providers: [HttpService, CommonService] 
})
export class ReportUserComponent  implements OnInit {
  parentComponent:any;
  myTaskComponent:any;
  apiResponse : any;
  reasonList : any;
  reportData :any;
  selectedVal : string;
  errorMessage : any;
  commdescription : string ;
  reasonListIndicator : boolean;
  constructor( private inj:Injector,private httpService: HttpService, private commonService: CommonService){
    this.parentComponent = this.inj.get(AppComponent);
    //this.myTaskComponent= this.inj.get(MyTaskComponent);
  }
  
  @Input() 
  userID : number;

  ngOnInit() {
    
    window.scrollTo(0,0);
    this.selectedVal = "";
    this.commdescription = "";
  }
  // report user
  reportUser(model: any, isValid : boolean){
    if(isValid)
    {
      this.reportData={};
      this.reportData.reasonId= model.reasonValue;
      //this.reportData.reasonDescription= model.reasonValue;
      this.reportData.comment= model.description;
      this.reportData.reportedUserId= this.userID;
      this.reportData.postedUserId= this.commonService.getCookieValues("userid");
      this.reportData.reportingPlatform= this.getPlatform();
       this.commonService.showLoader();
      this.httpService.reportuser(this.reportData).subscribe(
        data => {
          this.apiResponse = data;
          if(this.apiResponse.message == 'Report posted successfully')
          {
            this.selectedVal = "";
            this.commdescription = "";  
            this.errorMessage = "";
            this.commonService.hideLoader();
            $('#ReportUserModal').modal('hide');
            $('#ReportModalSuccess').modal({backdrop: 'static', keyboard: false},'show');
            //this.myTaskComponent.taskDetail=false;
          }
          else{
          //   this.commentIndicator = false;
            this.commonService.hideLoader();
          }
      });
    }
    else{
      this.errorMessage = "Please enter required details.";
    }
  }
  closePopup(){
    $('#ReportUserModal').modal('hide');
    //this.myTaskComponent.taskDetail=false;
  }
  getPlatform() {
    var width_ = screen.width;
    var SIZE = {
        "MOB": 767,
        "TAB": 768,
        "WEB": 1025,
    };
    if (width_ <= SIZE.MOB) {
        return "Mobile Web";
    } else if ((width_ > SIZE.MOB) && (width_ < SIZE.WEB)) {
        return "TAB";
    } else if ((width_ > SIZE.WEB)) {
        return "WEB";
    }
  }
}
