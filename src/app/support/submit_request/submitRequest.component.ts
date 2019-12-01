import { Component, OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import { AppComponent } from './../../app.component';
import { CommonService } from './../../services/common.service';
import { HttpService } from './../../services/http.service';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'routing-root',
  templateUrl: './submitRequest.component.html',
  providers: [HttpService, CommonService]
})
export class SubmitRequestComponent implements OnInit {
  submitRequestForm: FormGroup;
  parentComponent: any;
  apiResponse: any;
  categoryList: any;
  requiredValidator: boolean;
  file: any;
  fileName: any;
  constructor(private inj: Injector, private httpService: HttpService, private commonService: CommonService, private fb: FormBuilder) {
    this.parentComponent = this.inj.get(AppComponent);

  }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.submitRequestForm = this.fb.group({
      requestCategory: ['', Validators.required],
      requestEmail: ['', Validators.email],
      requestSubject: ['', [Validators.required, Validators.maxLength(150)]],
      requestDescription: ['', Validators.required],
      requestTaskid: [''],
      requestFile: ['']
    });
    this.httpService.getArticleCategory().subscribe(
      data => {
        this.apiResponse = data;
        if (this.apiResponse.message == 'Article category list') {
          this.categoryList = this.apiResponse.data;
        } else {
          this.categoryList = [];
        }
      });
  }
  submitRequest(model: any, isValid: boolean) {
    if (isValid) {
      this.commonService.showLoader();
      var param = {
        support_type: model.requestCategory,
        email: model.requestEmail,
        subject: model.requestSubject,
        description: model.requestDescription,
        requestFile: this.file, // optional field
        taskTitle: model.requestTaskid // optional field
      }
      this.requiredValidator = false;
      this.httpService.submitRequest(param).subscribe(
        data => {
          this.apiResponse = data;
          if (this.apiResponse.status == 1) {
            alert(this.apiResponse.message);
            this.submitRequestForm.reset();
            this.fileName = null;
            //this.categoryList=this.apiResponse.data;
            this.commonService.hideLoader();

          } else {
            this.commonService.hideLoader();
          }
        });
    } else {
      window.scrollTo(0, 0);
      this.requiredValidator = true;
    }
  }

  fileUpload(event) {
    let imageName = event.target.files[0].name;
    this.fileName = event.target.files[0].name;
    let ext = (imageName.substring(imageName.lastIndexOf('.') + 1).toLowerCase());
    let reader = new FileReader();
    console.log('files', ext);
    //this.fileName=event.target.value;
    // var image = this.element.nativeElement.querySelector('.image');
    //  if(ext=='png'||ext=='jpg')
    // {
    reader.onload = this.onLoadCallback.bind(this);
    //  } else {
    // }
    reader.readAsDataURL(event.target.files[0]);
  }
  onLoadCallback(e) {
    this.file = e.target["result"];
    console.log('files', e.target);
  }
}
