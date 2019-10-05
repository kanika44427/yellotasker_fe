import { Component , OnInit} from '@angular/core';
import { CommonService } from './services/common.service';
import {ActivatedRoute,Router} from '@angular/router';
import { HttpService } from './services/http.service';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular5-social-login';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [CommonService, HttpService] 
})

export class AppComponent implements OnInit {
errorMessage = "";
loginIndicator:  boolean= false;
loginDetails : any;
catObject: any;
postTaskObject: any;
taskFinishIndicator:boolean;
apiResponse : any;
reasonList : any;
reasonUserList : any;
constructor(private commonService: CommonService,private route:ActivatedRoute,private router:Router, private httpService: HttpService, private socialAuthService: AuthService){}

ngOnInit() {
   this.loginDetails = {};
   this.loginDetails.id  = this.commonService.getCookieValues("userid");
   if(this.loginDetails.id != null)
   {
        this.loginIndicator = true;
        this.loginDetails.first_name = this.commonService.getCookieValues("userFirstName");
        this.loginDetails.last_name = this.commonService.getCookieValues("userLastName");
        this.loginDetails.profile_image = this.commonService.getCookieValues("userImage");
   }
    this.getReason();
    
 }
 getReason(){
    this.httpService.getReason().subscribe(
      data => {
        this.apiResponse = data;
        this.commonService.showLoader();
        if(this.apiResponse.message == 'reason list')
        {
          this.reasonList=this.apiResponse.data.taskReason;  
          this.reasonUserList=this.apiResponse.data.userReason;       
          this.commonService.hideLoader();
        }
        else{
        //   this.commentIndicator = false;
           this.commonService.hideLoader();
        }
    });
  }
 
setUserDashboard(loginDetails: any) {
    this.loginDetails = {};
    this.loginDetails = loginDetails.data;
    if(this.loginDetails.id)
    {
        this.loginIndicator = true;
        this.commonService.setCookieValues("userid", this.loginDetails.id);
        this.commonService.setCookieValues("userFirstName", this.loginDetails.first_name);
        this.commonService.setCookieValues("userLastName", this.loginDetails.last_name);
        if(this.loginDetails.profile_image)
        this.commonService.setCookieValues("userImage", this.loginDetails.profile_image);
    }
}

navigateToPublicProfile()
{
  this.router.navigate(['/profile-view/' + "/" + this.loginDetails.first_name + "/"+  this.loginDetails.id]);
}
openLoginPopup ()
{
  $('#loginPrompt').modal('hide'); 
  $('#LoginModal').modal({backdrop: 'static', keyboard: false},'show'); 
}

openSignupPopup ()
{
  $('#loginPrompt').modal('hide'); 
  $('#SignupModal').modal({backdrop: 'static', keyboard: false},'show'); 
}

openLoginPromptPopup ()
{
  $('#loginPrompt').modal({backdrop: 'static', keyboard: false},'show'); 
}

openPostTaskPopup(category)
{
  this.catObject=category;
 // if(this.loginDetails != null && this.loginDetails.id != null)
    $('#success').modal('hide');
    $('#PostTaskModal').modal({backdrop: 'static', keyboard: false},'show'); 
 // else
   // this.openLoginPromptPopup();
}
logout()
{
 this.loginIndicator = false;
 this.loginDetails = null;
 this.commonService.deleteCookieValues("userid");
 this.commonService.deleteCookieValues("userFirstName");
 this.commonService.deleteCookieValues("userLastName");
 this.commonService.deleteCookieValues("userImage");
 this.router.navigate(['./']);
 this.socialAuthService.signOut();
}

}
