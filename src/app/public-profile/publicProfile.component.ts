import { Component , OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import {AppComponent} from '../app.component';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';
import {ActivatedRoute, Router} from '@angular/router';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'routing-root',
  templateUrl: './publicProfile.component.html',
  providers: [HttpService, CommonService] 
})
export class PublicProfileComponent  implements OnInit {
  parentComponent : any;
  apiResponse : any;
  id: any;
  profileData: any;
  posterIndicator : boolean;
  apiPortfolioResponse : any;
  portfolioImagesArr : any;
  userID : any;
  noReviewsAsPoster : boolean = true; 
  noReviewsAsTasker : boolean = true; 
  constructor(private inj:Injector, private httpService: HttpService, private commonService: CommonService,private route:ActivatedRoute , private router: Router){
    this.parentComponent = this.inj.get(AppComponent);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit() {

    this.profileData = {};
    this.posterIndicator = true;
    this.portfolioImagesArr = [];
    window.scrollTo(0,0);
    this.route.params.subscribe( params =>
      this.id = params['id']
  )
  this.getUserPublicProfile(this.id);
  this.getPortfolioImage();
  this.userID = this.commonService.getCookieValues("userid");
  }
  getProfileOfOthers()
  {
    window.location.reload(true);
  }
  getUserPublicProfile(id){
    this.commonService.showLoader();
    this.httpService.getUserPublicProfile(id).subscribe(
      data => {
        this.apiResponse = data;
        console.log('response',this.apiResponse);
        if(this.apiResponse.message == 'User public profile' || this.apiResponse.message == 'Review found')
        {
          this.profileData=this.apiResponse.data;
          if(this.profileData.task_as_poster){
           for(var i= 0; i < this.profileData.task_as_poster; i++){
            if(this.profileData.task_as_poster[i].doer_user_detail && this.profileData.task_as_poster[i].doer_user_detail.doer_review){
                this.noReviewsAsPoster = true; 
            }
           }
          }
          if(this.profileData.task_as_doer){
            for(var i= 0; i < this.profileData.task_as_doer; i++){
             if(this.profileData.task_as_doer[i].task_posted_user && this.profileData.task_as_doer[i].task_posted_user.poster_review){
                 this.noReviewsAsTasker = true; 
             }
            }
           }
          if(this.profileData.skills != null)
          {
            this.profileData.skills  = this.profileData.skills.split(',');
          }
          if(this.profileData.modeOfreach != null)
          {
            this.profileData.modeOfreach = this.profileData.modeOfreach.split(',');
          }
          this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
    });
  }
  
  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

  reportUser()
  {
    this.userID = this.commonService.getCookieValues("userid");
    $('#ReportUserModal').modal({backdrop: 'static', keyboard: false},'show');
  }
  getUserProfile(userType)
  {
    if(userType == 'poster')
    {
      this.posterIndicator = true;
    }
    else if(userType == 'worker')
    {
      this.posterIndicator = false;
    }
  }

  getPortfolioImage(){
    let userId=this.commonService.getCookieValues("userid");
    var param={
      userId : this.id,
    }
    this.commonService.showLoader();
    this.httpService.getPortfolioImage(param).subscribe(
      data => {
        this.apiPortfolioResponse = data;
        if(this.apiPortfolioResponse.message == 'Portfolio Image found')
        {
           this.portfolioImagesArr=[];
           this.portfolioImagesArr=this.apiPortfolioResponse.data;
           this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
    });
  }
}
