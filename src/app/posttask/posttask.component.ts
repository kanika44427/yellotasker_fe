import { Component,Input, Output, EventEmitter , OnInit,Injector } from '@angular/core';
import {AppComponent} from '../app.component';
import { FormBuilder, FormGroup, Validators , FormControl, NgForm  } from '@angular/forms';
import { Task } from '../models/posttask.interface';
import { HttpService } from '../services/http.service';
import { CommonService } from '../services/common.service';
import { User } from '../posttask/user';
import { DatePipe } from '@angular/common';
import { DataService } from '../services/data.service';
import { DatepickerModule } from 'angular2-material-datepicker';
import {ActivatedRoute,Router} from '@angular/router';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'posttask-popup',
  templateUrl: './posttask.component.html',
  providers: [HttpService, CommonService, DatePipe] 
})

export class PostTaskComponent implements OnInit {
postTaskStep1Form: FormGroup;
postTaskStep2Form: FormGroup;
postTaskStep3Form : FormGroup;
public charsLeft: number = 5000;
minDate = new Date(2000, 0, 1);
maxDate = new Date(2020, 0, 1);

@Output()
setUserDashboard : EventEmitter<any> = new EventEmitter<any>();
private apiResponse : any;
minLenIndicator = false;
minReqValIndicator =false;
errorIndicator = false;
detailsIndicator = true;
locationIndicator = false;
isStep1Visited = false;
isStep2Visited = false;
isTaskPosted = false;
budgetIndicator = false;
paymentIndicator=false;
taskSuccessIndicator = false;
taskFinishIndicator = false;
titleReqIndicator = false;
descReqIndicator = false;
locationReqIndicator= false;
dueDateReqIndicator = false;
errorMessage = "";
task =  new Task('', '', '', '', '', '', 0, '', '', '', 0, 0, 0, '',0);
user : any;
parentComponent : any;
postObj : any;
taskId : any;
taskTitle : any;
molPayValues : any;
postTaskSucess:boolean;
budgetReqIndicator:boolean;
configSettings : any;
constructor(private inj:Injector,private httpService: HttpService, 
  private dataService : DataService,
  private commonService: CommonService, private fb: FormBuilder
, private datePipe: DatePipe,private route:ActivatedRoute,private router:Router){
  this.parentComponent = this.inj.get(AppComponent);
}

ngOnInit() {
    this.errorIndicator = false;
    this.detailsIndicator = true;
    this.locationIndicator = false;
    this.isStep1Visited = false;
    this.isStep2Visited = false;
    this.isTaskPosted= false;
    this.budgetIndicator = false;
    this.taskFinishIndicator = false;
    this.taskSuccessIndicator = false;
    this.minLenIndicator = false;
    this.paymentIndicator=false;
    this.postTaskSucess=false;
    this.budgetReqIndicator=false;
    this.titleReqIndicator=false;
    this.minLenIndicator=false;
    this.descReqIndicator=false;
    this.errorMessage = "";
    this.task =  new Task('', '', '', '', '', '', 0, '', '', '', 0, 0, 0, '', 0);
    this.postTaskStep1Form = this.fb.group({
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.maxLength(5000), Validators.minLength(25)]]
     
  });
}

changed(description) {
    this.charsLeft = 5000 - description.length;
    if(description.length < 25){
      this.minLenIndicator = true; 
    }
    else{
      this.minLenIndicator = false; 
    }
}

 //step 1 continue
onStep1Submit(form : any , model: any, isValid: boolean) {
  if(isValid)
  {
     this.task.title = model.title;
     this.task.description = model.description;
     this.isStep1Visited = true;
     this.showLocationTab();
     this.user = new User() ; 
   /*  this.postTaskStep2Form = this.fb.group({
        locationType : ['', Validators.required],
        address : [''],
        zipcode: [''],
        dueDate : [''],
        dueDateType : ['', Validators.required]
     });*/
      this.errorIndicator = false;
      this.minLenIndicator = false;
  }
  else
    {
      this.titleReqIndicator=model.title==''?true:false;
      this.descReqIndicator=model.description==''?true:false;
      if(form.controls.description.errors.minlength)
      {
        this.minLenIndicator = true;
        this.errorIndicator = false;
      }
      else 
       this.errorIndicator = true;
    }
  }
  
  getDate(dueDateType : string )
  {
     if(dueDateType == 'Today')
    {
       var date = new Date;
       var day = date.getDate();
       var monthIndex = date.getMonth()+1;
       var year = date.getFullYear();
       this.user.dueDate = date;
       this.task.dueDate=day+'-'+monthIndex+'-'+year;
    }
    else  if(dueDateType == 'Tommorow')
      {
        var date = new Date();
        date.setDate(date.getDate() + 1);
        this.user.dueDate = date;
      }
    else if(dueDateType == 'Within 1 week')
        {
          var date = new Date();
          date.setDate(date.getDate() + 7);
          this.user.dueDate = date;
        }
    else if(dueDateType == 'By a certain date')
      {
         var date = new Date();
         this.user.dueDate = date;       
      }
  }

  onStep2Submit(model: any, isValid: boolean) {
  if(isValid&&model.locationType!=undefined&&model.dueDateType!=undefined)
  {
     this.errorIndicator = false;
     this.locationReqIndicator=false;
     this.dueDateReqIndicator=false;
     this.task.locationType = model.locationType;
     this.task.address = model.address;
     this.task.zipcode = model.zipcode;
    // this.task.due_date = model.dueDate;
    // this.task.dueDate = this.user.dueDate ;
     this.task.dueDateType = this.user.dueDateType ;
     this.isStep2Visited = true;
     this.showBudgetTab();
     this.postTaskStep3Form = this.fb.group({
        //peopleRequired : ['', [Validators.required, Validators.minLength(1)]],
       // typeOfPeople : ['', []],
        budgetType : ['', [Validators.required]],
        amount : ['', [Validators.required, Validators.minLength(1)]],
        hourlyRate : ['']
     });
  }
  else
    {
      this.locationReqIndicator=model.locationType==''||model.locationType==undefined?true:false;
      this.dueDateReqIndicator=model.dueDateType==''||model.dueDateType==undefined?true:false;
      this.errorIndicator = false;
    }
  }

  onStep3Submit(model: any, isValid: boolean) {
    let loginId= this.commonService.getCookieValues("userid");
    //var reqPeople =model.peopleRequired;
    var amt=model.amount;
    if(isValid && amt > 0)
      {
        var date = new Date(this.user.dueDate)  ;
        
        //this.task.dueDate = date.toLocaleString('en-US', { timeZone: 'America/New_York' });
        this.task.dueDate = date; 
            

        if(loginId!=null) {
         
          //this.task.people_required = Math.abs(model.peopleRequired);
          this.task.typeOfPeople = model.typeOfPeople;
          this.task.budgetType = model.budgetType;
          this.task.totalAmount = Math.abs(model.amount);
          if(this.parentComponent.catObject){
           this.task.categoryId = this.parentComponent.catObject.category_id;
          }
         /* if(this.task.budgetType == 'Total')
          {
           this.task.totalAmount = Math.abs(model.amount);
          }
          else
          {
            this.task.hourlyRate = +model.hourlyRate;
            this.task.totalHours = +Math.abs(model.amount);
            this.task.totalAmount = this.task.hourlyRate * this.task.totalHours;
          }*/
          this.task.userId = this.commonService.getCookieValues("userid");
               this.commonService.showLoader();
               var postTaskOperation =  this.httpService.posttask(this.task);
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
                   this.task =  new Task('', '', '', '', '', '', 0, '', '', '', 0, 0, 0, '',0);
                   this.detailsIndicator = false;
                   this.locationIndicator = false;
                   this.budgetIndicator = false;
                   //ks : commenting fourth tab. 
                   var config = this.dataService.getConfigData();
                   if(config && config.payment_status == 'enable')
                     this.taskFinishIndicator = true;
                   else
                     $('#success').modal('show');
                   this.isTaskPosted=true;
                   this.taskId=this.apiResponse.data.id;
                   this.taskTitle=this.apiResponse.data.title;
                 }
               },
               err => {
                 // Log errors if any error occured.
                 console.log(err);
               });
        } else {
         //this.task.people_required = Math.abs(model.peopleRequired);
          this.task.typeOfPeople = model.typeOfPeople;
          this.task.budgetType = model.budgetType;
       
          if(this.parentComponent.catObject){
           this.task.categoryId = this.parentComponent.catObject.category_id;
          }
         /* if(this.task.budgetType == 'Total')
          {
           this.task.totalAmount = Math.abs(model.amount);
          }
          else
          {
            this.task.hourlyRate = +model.hourlyRate;
            this.task.totalHours = +Math.abs(model.amount);
            this.task.totalAmount = this.task.hourlyRate * this.task.totalHours;
          }*/
          this.task.userId = this.commonService.getCookieValues("userid");
          this.parentComponent.postTaskObject=this.task;
          $('#PostTaskModal').modal('hide');
          $('#loginPrompt').modal({backdrop: 'static', keyboard: false},'show');
        }
      }
      else
        {
             this.minReqValIndicator=amt<0||amt==0?true:false;
             this.budgetReqIndicator=model.budgetType==''||model.budgetType==undefined?true:false;       
        }
  }
  back(){
   
    if(this.isStep2Visited == true&&this.isStep1Visited == true&&this.locationIndicator==false){
      this.detailsIndicator = false;
      this.locationIndicator = true;
      this.budgetIndicator = false;
     this.taskFinishIndicator = false;
    } else if(this.isStep1Visited == true&&this.locationIndicator==true) {
      this.detailsIndicator = true;
      this.locationIndicator = false;
      this.budgetIndicator = false;
      this.taskFinishIndicator = false;
    }
    
  }
showSuccessPopup()
{
  var paymentOptn=$("input[name='radio']:checked").val();
  this.postObj={};
  this.postObj.taskId=this.taskId;
  this.postObj.title=this.taskTitle;
  this.postObj.paymentMode=paymentOptn;
  this.httpService.updatePostTask(this.postObj).subscribe(
    data => {
      this.apiResponse = data;
      this.commonService.showLoader();
      
      if(this.apiResponse.message == 'Task  updated successfully.')
      {
        this.commonService.hideLoader();
        this.detailsIndicator = false;
        this.locationIndicator = false;
        this.budgetIndicator = false;
        this.taskFinishIndicator = false;
        this.postTaskSucess=true;
        $('#success').modal('show');
        setTimeout(()=>{ 
          $('#PostTaskModal').modal('hide');
          $('#success').modal('hide');
          this.detailsIndicator = true;
          this.ngOnInit();
        }, 3000);
      }
      else{
         this.commonService.hideLoader();
      }
  });
}
closePosttaskPopup ()
{
  this.ngOnInit();
  $('#PostTaskModal').modal('hide'); 
}

showDetailsTab()
{   if(this.isTaskPosted==false) {
    this.detailsIndicator = true;
    this.locationIndicator = false;
    this.budgetIndicator = false;
    this.taskFinishIndicator = false;
  }
}

showLocationTab()
{
   if(this.isStep1Visited == true&&this.isTaskPosted==false)
   {
      this.detailsIndicator = false;
      this.locationIndicator = true;
      this.budgetIndicator = false;
      this.taskFinishIndicator = false;
   }
}

showBudgetTab()
{
  if(this.isStep1Visited == true && this.isStep2Visited == true&&this.isTaskPosted==false)
  {
    this.detailsIndicator = false;
    this.locationIndicator = false;
    this.budgetIndicator = true;
    this.taskFinishIndicator = false;
  }
}

showPaymentTab()
{
  let userId= this.commonService.getCookieValues("userid");
  var param={
    userId:userId,
    taskId:this.taskId,
    amount:this.apiResponse.data.totalAmount
    }
  this.httpService.makePayment(param).subscribe(
    data => {
      this.apiResponse = data;
      this.detailsIndicator = false;
      this.locationIndicator = false;
      this.budgetIndicator = false;
      this.taskFinishIndicator = true;
      this.paymentIndicator=true;
      if(this.apiResponse.message=='Success'){
         this.molPayValues=this.apiResponse.data;
         for(var i in this.apiResponse.data){
          var key = i;
          var val = this.apiResponse.data[i];
          for(var j in val){
              var sub_key = j;
              var sub_val = val[j];
              console.log(sub_key);
          }
      }
      } else {
         this.molPayValues==[];
      }
  });
}

hidePaymentTab(){
  this.paymentIndicator=false;
}

makePayment(){
  console.log('api',this.apiResponse);
  this.httpService.makeMolPayment(this.apiResponse.data).subscribe(
    data => {
      this.apiResponse = data;
      console.log('data',this.apiResponse);
  });
 
 }
 redirect(path){
  $('#PostTaskModal').modal('hide');
  $('#success').modal('hide');
  this.postTaskSucess=false;
  this.detailsIndicator = true;
  this.router.navigate([path]);
}
}
