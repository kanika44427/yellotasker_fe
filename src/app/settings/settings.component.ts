import { Component , OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import {AppComponent} from '../app.component';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';
import { Setting } from './setting';
import { Skills } from '../skills/skills';
import {ActivatedRoute,Router} from '@angular/router';
import { DatePipe } from '@angular/common';
import { DatepickerModule } from 'angular2-material-datepicker';
import {ReversePipe} from '../pipes/reversePipes';
import { DataService } from '../services/data.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'routing-root',
  templateUrl: './settings.component.html',
  providers: [HttpService, CommonService,ReversePipe,DatePipe] 
})
export class SettingComponent  implements OnInit {
  parentComponent : any;
  apiResponse : any;
  userData : any;
  setting: any;
  settingObj: any;
  imageName: any;
  getRole: any;
  showMobile:boolean;
  showAccount:boolean;
  showSkills:boolean;
  skills: any;
  skillsObj: any;
  getAround: any;
  portfolio:boolean;
  portfolioImage:any;
  portfolioImagesArr:any;
  skillArray:any;
  roleArr:any;
  errorMessage : any;
  mobileSectionIndicator : boolean;
  errorMobileMessage : any;
  mobileNumber : any;
  otpSectionIndicator : any;
  errorOTPMessage : any;
  otpNumber : any;
  isMobileVerified : any;
  dashboardData : any;
  totalPercentage : any;
  accountDeactivation:boolean=false;
  openMenu:boolean = false;
  notificationAlerts:boolean=false;
  notificationPreference:boolean=false;
  passwordChange:boolean=false;
  activeMenu:any='account';
  emailAlert:any=false;
  mobileAlert:any=false;
  passwordIndicator = false;
  successIndicator = false;
  oldPass : string =""; 
  newPass : string = ""; 
  confPass : string = ""; 
  constructor(private inj:Injector,private route:ActivatedRoute,
    public dataService : DataService, 
    private router:Router, private httpService: HttpService, private commonService: CommonService,private datePipe: DatePipe){
    this.parentComponent = this.inj.get(AppComponent);
    
}
  ngOnInit() {
    window.scrollTo(0,0);
    this.getUserProfile();
    this.getProfilecompletion();
    this.setting=new Setting();
    this.skills=new Skills();
    this.skillArray=[];
    this.getAround=[];
    this.getRole=[];
    this.roleArr=[];
    this.showAccount=true;
    this.showMobile=false;
    this.showSkills=false;
    this.portfolioImagesArr = [];
   this.mobileSectionIndicator = true;
    this.otpSectionIndicator = false;
    this.errorOTPMessage = "";
    this.otpNumber = "";
    this.mobileNumber = "";
    this.errorMobileMessage = "";
    this.isMobileVerified = false;
  }

  toggleMenu(){
    this.openMenu = !this.openMenu;
    this.settingTab('privacy-settings');
  }


  deactivateAcc(){
    var r = confirm("Are you sure you want to deactivate your account ?");
    if (r) {
    let userId=this.commonService.getCookieValues("userid");
    this.commonService.showLoader();
    this.httpService.deactivateAcc(userId).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Account deativated successfully')
        {
          alert("Your account has been deactivated successfully.Please contact admin@yellotasker.com to activate account again.")
          this.parentComponent.loginIndicator = false;
          this.parentComponent.loginDetails = null;
          this.commonService.deleteCookieValues("userid");
          this.commonService.deleteCookieValues("userFirstName");
          this.commonService.deleteCookieValues("userLastName");
          this.router.navigate(['./']);
          this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
    });
  } else {
    return;
  }
  }
  getUserProfile(){
    let userId=this.commonService.getCookieValues("userid");
    this.commonService.showLoader();
    this.httpService.getUserProfile(userId).subscribe(
      data => {
        this.apiResponse = data;
        
        if(this.apiResponse.message == 'User data fetched.')
        {
          this.setting=this.apiResponse.data;
          console.log("Daattaa",this.apiResponse);
          if(this.apiResponse.data.phone != null && this.apiResponse.data != "" && this.apiResponse.data.phone != undefined)
          {
            this.isMobileVerified = true;
            this.mobileSectionIndicator = false;
          } 
          var date = new Date(this.setting.birthday);
          this.setting.birthday=date;
          this.roleArr=[];
          if(this.setting.user_type!=null&&this.setting.user_type==''){
            this.roleArr = this.setting.user_type.split(',');
           }
          this.getRole=this.roleArr;
          this.emailAlert=(this.setting.email_alert=="true")?true:false;
          this.mobileAlert=(this.setting.mobile_alert=="true")?true:false;
          this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
        
    });
  }
  emailAlertAction() {
    if(this.emailAlert) {
      this.emailAlert=false;
    } else {
      this.emailAlert=true;
    }
    var obj={
      "email_alert":this.emailAlert?"true":"false"
    }
    let userId=this.commonService.getCookieValues("userid");
    this.commonService.showLoader();
    this.httpService.saveUserProfile(obj,userId).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Profile updated successfully')
        {
         // this.setting=this.apiResponse.data;
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

  mobileAlertAction() {
    if(this.mobileAlert) {
      this.mobileAlert=false;
    } else {
      this.mobileAlert=true;
    }
    var obj={
      "mobile_alert":this.mobileAlert?"true":"false"
    }
    let userId=this.commonService.getCookieValues("userid");
    this.commonService.showLoader();
    this.httpService.saveUserProfile(obj,userId).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Profile updated successfully')
        {
         // this.setting=this.apiResponse.data;
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
  getProfilecompletion()
{
  
    let userId=this.commonService.getCookieValues("userid");
    this.commonService.showLoader();
    this.httpService.dashboard(userId).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'User dashboard data')
        {
          this.dashboardData=this.apiResponse.data;
          console.log("Profile completion",this.apiResponse);
         // this.dashboardData.percentageCompletion = 
         var skill_completion =  +this.dashboardData.skill_completion.replace("%", "");
         var profile_completion = +this.dashboardData.profile_completion.replace("%", "");
         var badges_completion = +this.dashboardData.badges.replace("%", "");
         this.totalPercentage = (skill_completion + profile_completion + badges_completion) / 3;
         this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
});
}
  settingSave(model: any,isValid:any){
    this.commonService.showLoader();
    this.settingObj={};
    this.settingObj=model;
    this.settingObj.profile_image=model.profile_image;
    var date = new Date(this.setting.birthday);
    this.settingObj.birthday=date;
    this.settingObj.user_type=this.getRole.toString();
    let userId=this.commonService.getCookieValues("userid");
    this.settingObj.email_alert=this.emailAlert;
    this.settingObj.mobile_alert=this.mobileAlert;
    this.httpService.saveUserProfile(this.settingObj,userId).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Profile updated successfully')
        {
          this.setting=this.apiResponse.data;
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
   
  imageUpload(event,type){
    let imageName=event.target.files[0].name;
    let ext = (imageName.substring(imageName.lastIndexOf('.') + 1).toLowerCase());
    let reader = new FileReader();
    if(ext=='png'||ext=='jpg')
    {
        reader.onload = type=='portfolio'?this.onPortImgCallback.bind(this):this.onLoadCallback.bind(this);
    } else {
    }
        reader.readAsDataURL(event.target.files[0]);
  }
  onLoadCallback(e){
      this.setting.profile_image=e.target["result"];
  } 
  onPortImgCallback(e){
  
    this.portfolioImage=e.target["result"];

     } 
  roleType(e,value){
    if(e.target.checked){
      this.getRole.push(value);
     } else {
       var index = this.getRole.indexOf(value);
       if (index > -1) {
        this.getRole.splice(index, 1);
       }
     }
  }
  settingTab(type){
    this.activeMenu='';
    this.activeMenu=type;
    if(type=='account'||type=='skills'||type=='mobile'||type=='portfolio') {
      this.openMenu = false;
    }
    // if(type=='mobile'){
    //   this.showMobile=true;
    //   this.showAccount=false;
    //   this.showSkills=false;
    //   this.portfolio=false;
    //   this.accountDeactivation=false;
    //   this.notificationAlerts=false;
    //   this.notificationPreference=false;
    //   this.passwordChange=false;
    // } else if(type=='account'){
    //   this.showAccount=true;
    //   this.showMobile=false;
    //   this.showSkills=false;
    //   this.portfolio=false;
    //   this.accountDeactivation=false;
    //   this.notificationAlerts=false;
    //   this.notificationPreference=false;
    //   this.passwordChange=false;
    // } else if(type=='skills'){
    //   this.getSkills();
    //   this.showSkills=true;
    //   this.showAccount=false;
    //   this.showMobile=false;
    //   this.portfolio=false;
    //   this.accountDeactivation=false;
    //   this.notificationAlerts=false;
    //   this.notificationPreference=false;
    //   this.passwordChange=false;
    // } else if(type=='portfolio'){
    //   this.getPortfolioImage();
    //   this.portfolio=true;
    //   this.showSkills=false;
    //   this.showAccount=false;
    //   this.showMobile=false;
    //   this.accountDeactivation=false;
    //   this.notificationAlerts=false;
    //   this.notificationPreference=false;
    //   this.passwordChange=false;
    // } else if(type=='privacy-settings') {
    //   this.portfolio=false;
    //   this.showSkills=false;
    //   this.showAccount=false;
    //   this.showMobile=false;
    //   this.accountDeactivation=true;
    //   this.notificationAlerts=false;
    //   this.notificationPreference=false;
    //   this.passwordChange=false;
    // } else if(type=='notf-preference') {
    //   this.portfolio=false;
    //   this.showSkills=false;
    //   this.showAccount=false;
    //   this.showMobile=false;
    //   this.accountDeactivation=false;
    //   this.notificationAlerts=false;
    //   this.notificationPreference=true;
    //   this.passwordChange=false;
    // } else if(type=='password-change') {
    //   this.portfolio=false;
    //   this.showSkills=false;
    //   this.showAccount=false;
    //   this.showMobile=false;
    //   this.notificationAlerts=false;
    //   this.accountDeactivation=false;
    //   this.notificationPreference=false;
    //   this.passwordChange=true;
    // } else if(type=='notf-alerts') {
    //   this.portfolio=false;
    //   this.showSkills=false;
    //   this.showAccount=false;
    //   this.showMobile=false;
    //   this.accountDeactivation=false;
    //   this.notificationAlerts=true;
    //   this.notificationPreference=false;
    //   this.passwordChange=false;
    // }
  }
  getSkills(){
    let userId=this.commonService.getCookieValues("userid");
    this.commonService.showLoader();
    this.httpService.getUserProfile(userId).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'User data fetched.')
        {
          this.skills=this.apiResponse.data;
           let modeOfReach=[];
           if(this.skills.modeOfreach!=null&&this.skills.modeOfreach==''){
            modeOfReach=this.skills.modeOfreach.split(',');
           }
           this.skillArray=modeOfReach;
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
      var index = this.getAround.indexOf(value);
      if (index > -1) {
       this.getAround.splice(index, 1);
      }
    }
  }
  uploadImage(){
    if(this.portfolioImagesArr.length < 6 ) //if image is less than 6 
    {
      this.errorMessage = "";
      let userId=this.commonService.getCookieValues("userid");
      var param={
        userId : userId,
        image : this.portfolioImage
      }
      this.commonService.showLoader();
      this.httpService.uploadPortfolioImage(param).subscribe(
        data => {
          this.apiResponse = data;
          if(this.apiResponse.message == 'Portfolio Images uploaded successfully')
          {
            var newImage={
              imageId:this.apiResponse.data.id,
              images:'https://api.yellotasker.com/'+this.apiResponse.data.images,
              taskId:null,
              userId:this.apiResponse.data.userId
            }
            this.portfolioImagesArr = this.portfolioImagesArr.concat(newImage);
            this.portfolioImage='';
            this.commonService.hideLoader();
          }
          else{
            this.commonService.hideLoader();
          }
      });
    }
    else{
        this.errorMessage = "You can upload a max of 6 images.";
        this.portfolioImage = "";
    }
  }

  getPortfolioImage(){
    let userId=this.commonService.getCookieValues("userid");
    var param={
      userId : userId,
    }
    this.commonService.showLoader();
    this.httpService.getPortfolioImage(param).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Portfolio Image found')
        {
           this.portfolioImagesArr=[];
           this.portfolioImagesArr=this.apiResponse.data;
           this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
    });
  }
  deletePortfolioImage(imageId){
    let userId=this.commonService.getCookieValues("userid");
    var param={
      userId : userId,
      imageId:imageId
    }
    this.commonService.showLoader();
    this.httpService.deletePortfolioImage(param).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Portfolio Image deleted')
        {
           var index = this.portfolioImagesArr.findIndex(x => x.imageId==imageId);
           if (index > -1) {
             this.portfolioImagesArr.splice(index, 1);
         }
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
    this.skillsObj.skills = "cleaning", "dancing"; 
    this.skillsObj.modeOfreach=this.getAround.toString();
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
  getOtp()
  {
    if(this.mobileNumber == "" || this.mobileNumber == undefined || this.mobileNumber == null)
    {
      this.errorMobileMessage = "Please enter mobile number."
    }
    else if(this.mobileNumber.length < 10)
    {
      this.errorMobileMessage = "Please enter valid mobile number."
    }
    else{
     var params = {
       userId : this.commonService.getCookieValues("userid"),
       mobile : this.mobileNumber
     };
     this.commonService.showLoader();
     this.httpService.getOTP(params).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Otp generated')
        {
          this.mobileSectionIndicator = false;
          this.otpSectionIndicator = true;
          this.isMobileVerified = false;
          this.commonService.hideLoader();
          this.errorMobileMessage = "";
        }
        else{
           this.commonService.hideLoader();
        }
    });
    }
  }

  sendOTP()
  {
    if(this.otpNumber == "" || this.otpNumber == null || this.otpNumber == undefined)
    {
      this.errorMessage = "Please enter otp."
    }
    if(this.otpNumber.length > 0 )
    {
      var params = {
        userId : this.commonService.getCookieValues("userid"),
        mobile : this.mobileNumber,
        otp : this.otpNumber
      };
      this.commonService.showLoader();
      this.httpService.sendOTP(params).subscribe(
       data => {
         this.apiResponse = data;
         if(this.apiResponse.message == 'Otp Verified')
         {
           this.otpNumber = "";
           this.mobileNumber = "";
           this.mobileSectionIndicator = false;
           this.otpSectionIndicator = false;
           this.isMobileVerified = true;
           this.commonService.hideLoader();
         }
         else{
            this.errorMessage = "The otp you entered is wrong. Please enter valid otp."
            this.commonService.hideLoader();
         }
     });
    }
  }

  resetPassword(model: any, isValid: boolean)
  {
    this.errorMessage = "";
    if(isValid)
    {
      if(model.newPassword == model.confirmNewPassword)
      {
        this.passwordIndicator = false;
        this.commonService.showLoader();
       // var user = this.dataService.getUserData(); 
        model.email = this.setting.email;  
        var changePassword =  this.httpService.changePassword(model);
        changePassword.subscribe(
        response => {
          this.apiResponse = response;
          if(this.apiResponse.message == 'Password changed successfully.' )
          {
           this.successIndicator = true;
           model.email = ""; 
           model.oldPassword = ""; 
           model.newPassword = ""; 
           model.confirmNewPassword = ""; 
           this.commonService.hideLoader();
           //this.user = new User();
            setTimeout(function(){
              $('#loginPrompt').modal('hide'); 
              $('#LoginModal').modal({backdrop: 'static', keyboard: false},'show'); 
            }, 1000);
          }
          else if(this.apiResponse.message == 'Old password mismatch!')
          {
              this.errorMessage = 'Current password you entered is wrong. Please enter correct password.';
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
        if(model.newPassword == "" || model.oldPassword == "")
        this.errorMessage = "Please enter required details.";
      }
    }
}
