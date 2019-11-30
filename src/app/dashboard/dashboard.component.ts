import { Component, OnInit} from '@angular/core';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';
import { Injector } from '@angular/core';
import {AppComponent} from '../app.component';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'routing-root',
  templateUrl: './dashboard.component.html',
  providers: [HttpService, CommonService] 
})
export class DashboardComponent implements OnInit{
  apiResponse : any;
  dashboardData : any;
  posterIndicator : any;
  totalPercentage : any;
  parentComponent : any;
  categoryList : any;
  constructor(private inj:Injector, private httpService: HttpService, private commonService: CommonService,private router:Router){
    this.parentComponent = this.inj.get(AppComponent);
  }

  ngOnInit(){
    this.posterIndicator = true;
    let userId=this.commonService.getCookieValues("userid");
    this.commonService.showLoader();
    this.httpService.dashboard(userId).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'User dashboard data')
        {
          this.dashboardData=this.apiResponse.data;
         // this.dashboardData.percentageCompletion = 
         var skill_completion =  +this.dashboardData.skill_completion.replace("%", "");
         var profile_completion = +this.dashboardData.profile_completion.replace("%", "");
         var badges_completion = +this.dashboardData.badges.replace("%", "");
         this.totalPercentage = (skill_completion + profile_completion + badges_completion) / 3;
         this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
    });
    //category dashboard 
    this.httpService.getCategory().subscribe(
      data => {
        this.apiResponse = data;
        this.commonService.showLoader();
        if(this.apiResponse.message == 'Category dashboard list')
        {
          this.categoryList=this.apiResponse .data;
          this.commonService.hideLoader();
        }
        else{
        //   this.commentIndicator = false;
           this.commonService.hideLoader();
        }
    });
  }

  getTaskSummary(userType)
  {
    if(userType == "Poster")
    {
      this.posterIndicator = true;
    }
    if(userType == "Worker"){
      this.posterIndicator = false;
    }
  }

  openPostTask(cat)
  {
    this.parentComponent.openPostTaskPopup(cat);
  }
  redirectToMyTask(taskType) {
    this.commonService.setCookieValues('taskType',taskType);
    this.router.navigate(['./my-task']);
  }
}
