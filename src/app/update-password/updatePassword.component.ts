import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationExtras  } from '@angular/router';
import { HttpService } from '../services/http.service';
import { CommonService } from '../services/common.service';
import {User} from './user';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'routing-root',
  templateUrl: './updatePassword.component.html',
  providers: [HttpService, CommonService]
})
export class UpdatePasswordComponent  implements OnInit {
    private token: string;
    private key: string;
    errorMessage = "";
    apiResponse : any;
    passwordIndicator = false;
    successIndicator = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService, 
    private commonService: CommonService) {}
    user =  new User();

    ngOnInit() {
     this.route.params.forEach((params: Params) => {
        this.token = params['token'];
        this.key = params['key'];
        this.token = decodeURIComponent(this.token);
        this.key = decodeURIComponent(this.key);
        console.log(this.token, this.key); 
     });
    
    
     /*this.route.params.subscribe((params: Params) => {
          let token = params['token'];
          let key = params['key'];
          console.log(token);
          console.log(key);
        });*/
    console.log(JSON.stringify(this.token));
     //console.log(JSON.stringify(params['id']));
  }

  resetPassword(model: any, isValid: boolean)
  {
    this.errorMessage = "";
    if(isValid)
    {
      if(model.password == model.confirm_password)
      {
        this.passwordIndicator = false;
        this.commonService.showLoader();
        model.token = this.token;
        model.key = this.key;
        var resetOperation =  this.httpService.resetPassword(model);
        resetOperation.subscribe(
        response => {
          this.apiResponse = response;
          if(this.apiResponse.message == 'Password reset successfully.' )
          {
           this.successIndicator = true;
           this.commonService.hideLoader();
           this.user = new User();
           
            setTimeout(()=>{
              this.router.navigate(['./']);
              $('#loginPrompt').modal('hide'); 
              $('#LoginModal').modal({backdrop: 'static', keyboard: false},'show'); 
            }, 3000);
          }
          else if(this.apiResponse.message == 'Invalid reset password link!')
          {
              this.errorMessage = 'Something went wrong. Please try after some time.';
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
        if(model.confirm_password == "" || model.password == "")
        this.errorMessage = "Please enter required details.";
      }
    }
}
