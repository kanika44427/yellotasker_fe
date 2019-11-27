import { Component, Output, EventEmitter, Injector } from '@angular/core';
import { loginUser } from '../models/user.interface';
import { AppComponent } from '../app.component';
import { HttpService } from '../services/http.service';
import { CommonService } from '../services/common.service';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'login-popup',
  templateUrl: './login.component.html',
  providers: [HttpService, CommonService]
})

export class LoginComponent {

  @Output()
  setUserDashboard: EventEmitter<any> = new EventEmitter<any>();

  //private apiResponse = {};
  errorMessage = "";
  showError: boolean;
  emailError: boolean;
  passwordError: boolean;
  user = new loginUser('', '');
  apiResponse: any;
  parentComponent: any;

  constructor(private inj: Injector, private httpService: HttpService, private commonService: CommonService, private socialAuthService: AuthService) {
    this.parentComponent = this.inj.get(AppComponent);
  }

  //login
  login(model: loginUser, isValid: boolean) {
    this.errorMessage = "";
    if (isValid) {
      this.commonService.showLoader();
      var loginOperation = this.httpService.login(model);
      loginOperation.subscribe(
        response => {
          this.apiResponse = response;
          if (this.apiResponse.message == 'Successfully logged in.') {
            this.setUserDashboard.emit(response);
            this.commonService.hideLoader();
            this.user = new loginUser('', '');
            if (this.parentComponent.postTaskObject) {
              this.parentComponent.postTaskObject.userId = this.apiResponse.data.id;
              var postTaskOperation = this.httpService.posttask(this.parentComponent.postTaskObject);
              postTaskOperation.subscribe(
                response => {
                  this.apiResponse = response;
                  if (this.apiResponse.message !== "Task  created successfully.") {
                    this.commonService.hideLoader();
                    this.errorMessage = "Something went wrong. Please try after some time. ";
                  }
                  else {
                    this.commonService.hideLoader();
                    this.parentComponent.taskFinishIndicator = true;
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
            this.closeLoginPopup();
          }
          else if (this.apiResponse.message == 'Invalid email or password. Try again!') {
            this.errorMessage = 'Invalid email or password. Try again!';
            this.emailError = true;
            this.passwordError = true;
            this.commonService.hideLoader();
          } else if (this.apiResponse.message == 'This user is temporarily banned from using yellotasker') {
            this.errorMessage = 'Your account has been deactivated.Please contact "admin@yellotasker.com" for futher assistance.';
            this.commonService.hideLoader();
          }

        },
        err => {
          console.log(err);
        }
      );
    }
    else {
      if (model.email == "" || model.password == "")
        this.errorMessage = "Please enter required details.";
      this.emailError = model.email == "" ? true : false;
      this.passwordError = model.password == "" ? true : false;
    }
  }

  closeLoginPopup() {
    this.passwordError = false;
    this.emailError = false;
    this.errorMessage = "";
    this.user = new loginUser('', '');
    $('#LoginModal').modal('hide');
  }

  openForgetPopup() {
    this.errorMessage = "";
    $('#LoginModal').modal('hide');
    $('#myModalreset').modal({ backdrop: 'static', keyboard: false }, 'show');
  }
  openSignupPopup() {
    this.errorMessage = "";
    $('#LoginModal').modal('hide');
    $('#SignupModal').modal({ backdrop: 'static', keyboard: false }, 'show');
  }
  socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        this.closeLoginPopup()
        if (socialPlatformProvider == "facebook" && userData) {
          let name = userData.name.split(" ");
          this.parentComponent.loginDetails = {};
          this.parentComponent.loginDetails.first_name = userData.name;
          this.parentComponent.loginIndicator = true;
          this.commonService.setCookieValues("userFirstName", userData.name);
          if (userData.image) {
            this.parentComponent.loginDetails.profile_image = userData.image;
            this.commonService.setCookieValues("userImage", userData.image);
          }
          var requestObj = {
            "email": userData.email,
            "user_type": "facebook",
            "provider_id": userData.id,
            "profile_image": userData.image,
            "first_name": name[0] != undefined || name[0] != null ? name[0] : "",
            "last_name": name[1] != undefined || name[1] != null ? name[1] : ""
          };
          this.httpService.login(requestObj).subscribe(
            data => {
              console.log("login in data" + data);
              //to fetch from api 
              //this.commonService.setCookieValues("userid", this.loginDetails.id);
            });
        }
        if (socialPlatformProvider == "google" && userData) {
          let name = userData.name.split(" ");
          this.parentComponent.loginDetails = {};
          this.parentComponent.loginDetails.first_name = userData.name;
          this.parentComponent.loginIndicator = true;
          //this.commonService.setCookieValues("userid", this.loginDetails.id);
          this.commonService.setCookieValues("userFirstName", userData.name);
          if (userData.image) {
            this.commonService.setCookieValues("userImage", userData.image);
            this.parentComponent.loginDetails.profile_image = userData.image;
          }
          var requestObj = {
            "email": userData.email,
            "user_type": "google",
            "provider_id": userData.id,
            "profile_image": userData.image,
            "first_name": name[0] != undefined || name[0] != null ? name[0] : "",
            "last_name": name[1] != undefined || name[1] != null ? name[1] : ""
          };
          this.httpService.login(requestObj).subscribe(
            data => {
              console.log("login in data" + data);
              //to fetch from api 
              //this.commonService.setCookieValues("userid", this.loginDetails.id);
            });
        }
      });
  }

}