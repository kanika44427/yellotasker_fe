import { Component , OnInit} from '@angular/core';
import { CommonService } from './services/common.service';
import {ActivatedRoute,Router} from '@angular/router';
import { HttpService } from './services/http.service';
import { DataService } from './services/data.service';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular5-social-login';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [CommonService, HttpService, DataService] 
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
configSettings : any;
showMenu:boolean=false;
footerMenu:any='';
constructor(private commonService: CommonService,
  private dataService : DataService, 
  private route:ActivatedRoute,private router:Router, private httpService: HttpService, private socialAuthService: AuthService){}

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
    this.dataService.setConfigData();
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
  if(this.loginIndicator) {
    this.router.navigate(['/profile-view/' + "/" + this.loginDetails.first_name + "/"+  this.loginDetails.id]);
  } else {
    this.openLoginPopup();
  }
}
openLoginPopup ()
{
  this.dataService.setConfigData();
  $('#loginPrompt').modal('hide'); 
  $('#LoginModal').modal({backdrop: 'static', keyboard: false},'show'); 
}

openSignupPopup ()
{
  this.dataService.setConfigData();
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
  this.configSettings = this.dataService.getConfigData();
  console.log("in post tasl", this.configSettings);
 // if(this.loginDetails != null && this.loginDetails.id != null)
    $('#success').modal('hide');
    $('#PostTaskModal').modal({backdrop: 'static', keyboard: false},'show'); 
 // else
   // this.openLoginPromptPopup();
}

openMenu() {
  if(this.showMenu) {
    this.showMenu=false;
  } else {
    this.showMenu=true;
  }
}
// rediect to particular menu item
redirectToMenu(menu) {
  if(menu=='postTask') {
     this.openPostTaskPopup('');
     this.showMenu=false;
  } else if(menu=='register') {
     this.openSignupPopup();
     this.showMenu=false;
  } else if(menu=='login') {
     this.openLoginPopup();
     this.showMenu=false;
  } else if(menu=='logout') {
     this.logout();
     this.showMenu=false;
  } else if(menu=='profile') {
    this.router.navigate(['./profile-view/'+ this.loginDetails.first_name+'/'+this.loginDetails.id]);
    this.showMenu=false;
  } 
  else {
    this.router.navigate(['./'+ menu]);
    this.showMenu=false;
  }
}
footerMenuRedirection(menu) {
  this.footerMenu=menu;
  if(menu=='post-task') {
   this.openPostTaskPopup('');
  } else if(menu=='profile') {
    this.navigateToPublicProfile();
  } else {
    this.router.navigate(['./'+ menu]);
  }
  
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
