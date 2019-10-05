import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { CommonService } from '../services/common.service';
declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'reset-popup',
    templateUrl: './reset.component.html',
   providers: [HttpService, CommonService]  
})
export class ResetPasswordComponent {
errorMessage = "";
apiResponse : any;
user = { email : ""};


constructor(private httpService: HttpService, private commonService: CommonService){}

ngOnInit() {
  //this.user.email = "";
}

  closeResetPopup()
  {
    this.errorMessage = "";
    this.user =  {email : ""};
    $('#myModalreset').modal('hide'); 
  }
  
  openResetSuccessPopup()
  {
      $('#resetModalSuccess').modal({backdrop: 'static', keyboard: false},'show'); 
  }
reset(model: any, isValid: boolean) {
  this.errorMessage = "";
  if(isValid)
  {
      this.commonService.showLoader();
      var resetOperation =  this.httpService.forgetPassword(model);
      resetOperation.subscribe(
        response => {
          this.apiResponse = response;
          if(this.apiResponse.message == 'Reset password link has sent. Please check your email.' )
          {
           this.commonService.hideLoader();
           this.user = {email : ""};
           this.closeResetPopup ();
           this.openResetSuccessPopup ();
          }
          else if(this.apiResponse.code == 500)
          {
              this.errorMessage = 'Oh no! The address you provided is not in our system';
              this.commonService.hideLoader();
          }
          
        },
        err => {
          console.log(err);
         }
      );
  }
  else
    {
      //if(model.email == "")
      this.errorMessage = "Please enter required details.";
    }
  }

}
