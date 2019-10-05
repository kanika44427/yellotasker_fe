import { Component , OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import {AppComponent} from '../app.component';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';
declare var $ :any;
@Component({
  selector: 'routing-root',
  templateUrl: './howitworks.component.html',
  providers: [HttpService, CommonService] 
})
export class HowItWorksComponent  implements OnInit {
  parentComponent : any;
  apiResponse : any;
  userData : any;
  skills: any;
  skillsObj: any;
  imageName: any;
  getAround: any;
  taskList:any;
  constructor(private inj:Injector, private httpService: HttpService, private commonService: CommonService){
    this.parentComponent = this.inj.get(AppComponent);
    
}
  ngOnInit() {
    window.scrollTo(0,0);
    this.getUserProfile();
    this.commonService.showLoader();
    this.httpService.getLatestPostedTask().subscribe(
     data => {
       this.apiResponse = data;
       if(this.apiResponse.message == 'List of tasks.')
       {
         this.taskList = this.apiResponse.data;
         this.commonService.hideLoader();
         console.log(this.taskList );
       }
   });
  //  this.skills=new Skills();
    this.getAround=[];
  }
  openPostTaskPopup()
  {
    $('#PostTaskModal').modal({backdrop: 'static', keyboard: false},'show'); 
  }
  getUserProfile(){
    let userId=this.commonService.getCookieValues("userid");
    this.commonService.showLoader();
    this.httpService.getUserProfile(userId).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'User data fetched.')
        {
          this.skills=this.apiResponse.data;
          this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
    });
  }
  skillSave(model: any,isValid:any){
    this.commonService.showLoader();
    this.skillsObj={};
    this.skillsObj=model;
    this.skillsObj.modeOfreach=this.getAround;
    let userId=this.commonService.getCookieValues("userid");
    this.httpService.saveUserProfile(this.skillsObj,userId).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Profile updated successfully')
        {
          this.getAround=[];
          this.skillsObj=this.apiResponse.data;
          this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
    });
  }

  modeOfReach(e,value){
    if(e.target.checked){
     this.getAround.push(value);
    } else {
      this.getAround.pop(value);
    }
  }
}
