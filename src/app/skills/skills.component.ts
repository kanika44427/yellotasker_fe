import { Component , OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import {AppComponent} from '../app.component';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';
import { Skills } from './skills';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'routing-root',
  templateUrl: './skills.component.html',
  providers: [HttpService, CommonService] 
})
export class SkillsComponent  implements OnInit {
  parentComponent : any;
  apiResponse : any;
  userData : any;
  skills: any;
  skillsObj: any;
  imageName: any;
  getAround: any;
  constructor(private inj:Injector, private httpService: HttpService, private commonService: CommonService){
    this.parentComponent = this.inj.get(AppComponent);
    
}
  ngOnInit() {
    window.scrollTo(0,0);
    this.getUserProfile();
    this.skills=new Skills();
    this.getAround=[];
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
        //   let modeOfReach=[];
        //   modeOfReach=this.skills.modeOfreach;
        //   console.log('num',this.skills.modeOfreach[0]);
        //   for (var _i = 0; _i < modeOfReach.length; _i++) {
        //     var num = modeOfReach[_i];
           
        // }
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
          $('#OfferModalSuccess').modal('show');
          setTimeout(()=>{ 
            $('#OfferModalSuccess').modal('hide');
          }, 3000);
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
