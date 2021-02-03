import { Component , OnInit } from '@angular/core';
import { HttpService } from './../../services/http.service';
import { CommonService } from './../../services/common.service';
import {Injector} from '@angular/core';
import {AppComponent} from './../../app.component';
import { DatePipe } from '@angular/common';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'notification-browse-task',
  templateUrl: './notification.component.html',
  providers: [HttpService, CommonService]
})

export class NotificationComponent  implements OnInit {
  parentComponent:any;
  apiResponse:any;
  posterIndicator : any;
  taskList:any = []; ;
  constructor(private inj:Injector,private httpService: HttpService, private commonService: CommonService){
      this.parentComponent = this.inj.get(AppComponent);
    }
  ngOnInit() {
    this.posterIndicator = true;
  window.scrollTo(0,0);
  let userId=this.commonService.getCookieValues("userid");
  this.httpService.notifications(userId).subscribe(
    data => {
      this.apiResponse = data;
      if(this.apiResponse.message == 'Notification list found')
      {
        this.taskList = this.apiResponse.data.poster;
        this.commonService.hideLoader();
      }
   });
  }

  getTaskSummary(userType)
  {
    if(userType == "Poster")
    {
      this.posterIndicator = true;
      this.taskList = this.apiResponse.data.poster;
    }
    if(userType == "Worker"){
      this.posterIndicator = false;
      this.taskList = this.apiResponse.data.doer;
    }
  }
}
