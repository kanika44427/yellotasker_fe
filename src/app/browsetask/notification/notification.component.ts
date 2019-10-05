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
  taskList:any;
  constructor(private inj:Injector,private httpService: HttpService, private commonService: CommonService){
      this.parentComponent = this.inj.get(AppComponent);
    }
  ngOnInit() {
  window.scrollTo(0,0);
  this.httpService.notifications().subscribe(
    data => {
      this.apiResponse = data;
      if(this.apiResponse.message == 'Notification list found')
      {
        console.log('list', this.apiResponse);
        this.taskList = this.apiResponse.data;
        //this.taskList=this.taskList.slice(1, 10);
        console.log('list', this.taskList);
     //   this.taskListIndicator = true;
        this.commonService.hideLoader();
      }
  });
  }
}
