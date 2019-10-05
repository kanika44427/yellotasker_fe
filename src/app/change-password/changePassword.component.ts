import { Component , OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { CommonService } from '../services/common.service';
import {User} from './user';
import {ActivatedRoute,Router} from '@angular/router';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'routing-root',
  templateUrl: './changePassword.component.html',
  providers: [HttpService, CommonService]
})
export class ChangePasswordComponent  implements OnInit {
    errorMessage = "";
    apiResponse : any;
    passwordIndicator = false;
    successIndicator = false;
  constructor(
    private httpService: HttpService, 
    private commonService: CommonService,private router:Router) {}
    user =  new User();
    ngOnInit() {
    }

  changePassword(model: any, isValid: boolean)
  {
    this.errorMessage = "";
    if(isValid)
    {
      if(model.newPassword == model.confirmNewPassword)
      {
        this.passwordIndicator = false;
        this.commonService.showLoader();
        var changePasswordOperation =  this.httpService.changePassword(model);
        changePasswordOperation.subscribe(
        response => {
          this.apiResponse = response;
          if(this.apiResponse.message == 'Password changed successfully.' )
          {
           this.successIndicator = true;
           this.commonService.hideLoader();
           this.user = new User();
           this.router.navigate(['./']);
            setTimeout(function(){
              $('#loginPrompt').modal('hide'); 
              $('#LoginModal').modal({backdrop: 'static', keyboard: false},'show'); 
            }, 1000);
          }
          else if(this.apiResponse.message == 'The new password must be at least 6 characters.')
          {
              this.errorMessage = 'The new password must be at least 6 characters.';
              this.commonService.hideLoader();
          }
          else if(this.apiResponse.message == 'The email address you provided isn\'t in our system')
          {
              this.errorMessage = 'The email address you provided isn\'t in our system.';
              this.commonService.hideLoader();
          }
           else if(this.apiResponse.message == 'Old password mismatch!')
          {
              this.errorMessage = 'Old password mismatch!';
              this.commonService.hideLoader();
          }
        },
        err => {
          console.log(err);
         }
      );
      }
      else{

        this.passwordIndicator = true;
      }
    }
    else
      {
        if(model.confirmNewPassword == "" || model.newPassword == "" || model.email == "" || model.oldPassword == "")
        this.errorMessage = "Please enter required details.";
      }
    }
}
