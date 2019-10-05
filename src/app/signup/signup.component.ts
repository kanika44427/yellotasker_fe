import { Component, Output,EventEmitter,Injector} from '@angular/core';
import {AppComponent} from '../app.component';
import { signupUser } from '../models/user.interface';
import { HttpService } from '../services/http.service';
import { CommonService } from '../services/common.service';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular5-social-login';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'signup-popup',
  templateUrl: './signup.component.html',
  providers: [HttpService] 
})

export class SignupComponent {

@Output()
setUserDashboard : EventEmitter<any> = new EventEmitter<any>();

apiResponse : any;
errorMessage = "";
user =  new signupUser('', '', '', '', '','');
passwordIndicator = false;
showError:boolean;
emailError:boolean;
passwordError:boolean;
firstError:boolean;
confrmPasswordError:boolean;
parentComponent : any;
loginIndicator : any;
loginDetails : any;
accessToken :any;
constructor(private inj:Injector,private httpService: HttpService, private commonService: CommonService, private socialAuthService: AuthService){
  this.parentComponent = this.inj.get(AppComponent);
}


 //signup
signup(model: signupUser, isValid: boolean) {
  if(isValid)
  {
     if(model.password === model.cnfrmpassword)
      {
          this.passwordIndicator = false;
          this.commonService.showLoader();
          model.first_name=this.user.first_name.charAt(0).toUpperCase()+this.user.first_name.slice(1);
          model.last_name=this.user.last_name.charAt(0).toUpperCase()+ this.user.last_name.slice(1);
          model.user_type = "traditional";
          var signupOperation =  this.httpService.signup(model);
          signupOperation.subscribe(
          response => {
            this.apiResponse = response;
            if(this.apiResponse.message == "The email has already been taken.")
            {
               this.commonService.hideLoader();
               this.errorMessage = "This email has already been taken.";
            }
            else
            {
             
              this.setUserDashboard.emit(response);
              this.commonService.hideLoader();
              this.user = new signupUser('', '', '', '', '','');
              this.closeSignupPopup ();
              if(this.parentComponent.postTaskObject) {
                this.parentComponent.postTaskObject.userId=this.apiResponse.data.id;
                var postTaskOperation =  this.httpService.posttask(this.parentComponent.postTaskObject);
                postTaskOperation.subscribe(
                response => {
                  this.apiResponse = response;
                  if(this.apiResponse.message !== "Task  created successfully.")
                  {
                     this.commonService.hideLoader();
                     this.errorMessage = "Something went wrong. Please try after some time. ";
                  }
                  else
                  {
                   this.commonService.hideLoader();
                   this.parentComponent.taskFinishIndicator=true;
                   // this.task =  new Task('', '', '', '', '', '', 0, '', '', '', 0, 0, 0, '',0);
                    //this.detailsIndicator = false;
                    //this.locationIndicator = false;
                    //this.budgetIndicator = false;
                    //this.taskFinishIndicator = true;
                    
                  }
                },
                err => {
                  // Log errors if any error occured.
                  console.log(err);
                });
               }
            }
          },
          err => {
            // Log errors if any error occured.
            console.log(err);
          });
      }
      else{
        this.passwordIndicator = true;
      }
      
  }
    else
    {
      console.log('model',model);
        this.errorMessage = "Please enter required details.";
        this.firstError=model.first_name == ""?true:false;
        this.emailError=model.email == ""?true:false;
        this.passwordError=model.password == ""?true:false;
        this.confrmPasswordError=model.cnfrmpassword == ""||model.cnfrmpassword ==undefined?true:false;
    }
  }

closeSignupPopup ()
{
  this.errorMessage = "";
  this.user =  new signupUser('', '', '', '', '');
  $('#SignupModal').modal('hide'); 
}

openLoginPopup()
{
  this.errorMessage = "";
  $('#SignupModal').modal('hide'); 
  $('#LoginModal').modal({backdrop: 'static', keyboard: false},'show'); 
}
keyPress(event) {
  var key = event.keyCode;
  return ((key >= 65 && key <= 90)||(key >= 97 && key <= 122) || key == 8);
}

socialSignIn(socialPlatform : string) {
  let socialPlatformProvider;
  if(socialPlatform == "facebook"){
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  }else if(socialPlatform == "google"){
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  }
  
  this.socialAuthService.signIn(socialPlatformProvider).then(
    (userData) => {
       console.log(socialPlatform+" sign in data : " , userData);
       if(socialPlatformProvider == "facebook" && userData)
       {
          let name =userData.name.split(" ");
          let requestObj = {
            "email" : userData.email,
            "user_type" : "facebook",
            "provider_id" : userData.id,
            "profile_image" : userData.image,
            "first_name" : name[0] != undefined || name[0] != null ? name[0] : "" ,
            "last_name" : name[1] != undefined || name[1] != null ? name[1] : "" 
          };
          this.httpService.signup(requestObj).subscribe(
            data => {
              this.apiResponse = data;
             /* let name =userData.name.split(" ");
              this.parentComponent.loginDetails = {};
              this.parentComponent.loginDetails.first_name = userData.name; 
              this.parentComponent.loginIndicator = true;
              this.commonService.setCookieValues("userFirstName", userData.name);
              if(userData.image)
              {
                this.parentComponent.loginDetails.profile_image = userData.image; 
                this.commonService.setCookieValues("userImage", userData.image);
              }*/
              if(this.apiResponse.message == "The email has already been taken.")
              {
                 this.commonService.hideLoader();
                 this.errorMessage = "This email has already been taken.";
              }
              else
              {
                this.setUserDashboard.emit(this.apiResponse);
                this.commonService.hideLoader();
                this.user = new signupUser('', '', '', '', '','');
                this.closeSignupPopup ();
              }
          });
       }
       if(socialPlatformProvider == "google" && userData)
       {
        let name =userData.name.split(" ");
          var requestObj = {
            "email" : userData.email,
            "user_type" : "google",
            "provider_id" : userData.id,
            "profile_image" : userData.image,
            "first_name" : name[0] != undefined || name[0] != null ? name[0] : "" ,
            "last_name" : name[1] != undefined || name[1] != null ? name[1] : "" 
          };
          this.commonService.showLoader();
          this.httpService.signup(requestObj).subscribe(
            data => {
            /*  
              this.parentComponent.loginDetails = {};
              this.parentComponent.loginDetails.first_name = userData.name; 
              this.parentComponent.loginIndicator = true;
              this.commonService.setCookieValues("userid", this.loginDetails.id);
              this.commonService.setCookieValues("userFirstName", userData.name);
              if(userData.image)
              {
                this.commonService.setCookieValues("userImage", userData.image);
                this.parentComponent.loginDetails.profile_image = userData.image; 
              }*/
              this.apiResponse = data;
              if(this.apiResponse.message == "The email has already been taken.")
              {
                 this.commonService.hideLoader();
                 this.errorMessage = "This email has already been taken.";
              }
              else
              {
                this.closeSignupPopup ();
                this.setUserDashboard.emit(this.apiResponse);
              }
          });
       }
    });
  }

/***********Instagram Login **************** */

instagramLogin()
{
  this.authenticateInstagram();
  return false;
}


authenticateInstagram() {
    let instagramClientId = "3f6db4c4a43941339aafa3b9b57ead9b";
    let instagramRedirectUri = "localhost:4200";
     
    // Pop-up window size, change if you want
    var popupWidth = 700,
        popupHeight = 500,
        popupLeft = (window.screen.width - popupWidth) / 2,
        popupTop = (window.screen.height - popupHeight) / 2;
    // Url needs to point to instagram_auth.php
    var popup = window.open('/#/instagram_auth.php', '', 'width='+popupWidth+',height='+popupHeight+',left='+popupLeft+',top='+popupTop+'');
    popup.onload = function() {
        // Open authorize url in pop-up
        //if(window.location.hash.length == 0) {
            popup.open('https://instagram.com/oauth/authorize/?client_id='+instagramClientId+'&redirect_uri='+instagramRedirectUri+'&response_type=token', '_self');
        //}
        // An interval runs to get the access token from the pop-up
        var interval = setInterval(function() {
            try {
                // Check if hash exists
                if(popup.location.hash.length) {
                    // Hash found, that includes the access token
                    clearInterval(interval);
                    this.accessToken = popup.location.hash.slice(14); //slice #access_token= from string
                    popup.close();
                    if(this.login_callback != undefined && typeof this.login_callback == 'function'){
                      this.login_callback(this.accessToken);
                    }
                }
            }
            catch(evt) {
                // Permission denied
            }
        }, 100);
    };
};

login_callback(accessToken){
  alert("callback function" + accessToken)
    //alert("You are successfully logged in! Access Token: "+accessToken);
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "https://api.instagram.com/v1/users/self/?access_token="+accessToken,
        success: function(response){
            console.log(response);
        }
      });
  }
}