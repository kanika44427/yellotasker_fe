import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css'],
  providers: [HttpService, CommonService] 
})
export class PaymentMethodsComponent implements OnInit {
  bankDetails : any;
  response : any;
  isBankAlreadyExist : any;
  userBankDetail : any;
  constructor(private httpService: HttpService,private commonService: CommonService) { 
  
  }

  ngOnInit() {
    this.bankDetails = {};
    this.isBankAlreadyExist = false;
    this.getBankAccount();
  }

  getBankAccount()
  {
    var userId=this.commonService.getCookieValues("userid");
    this.commonService.showLoader();
    this.httpService.getBankDetails(userId).subscribe(
      data => {
        this.response = data;
        if(this.response.message == "Records found.")
        {
          if(this.response.data.length > 0 )
          {
            this.userBankDetail = this.response.data[0];
            this.isBankAlreadyExist = true;
          }
          this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
    });
  }

  addBankAccount()
  {
    console.log(this.bankDetails);
    this.bankDetails.userId=this.commonService.getCookieValues("userid");
    this.commonService.showLoader();
    this.httpService.addBankDetails(this.bankDetails).subscribe(
      data => {
        this.response = data;
        if(this.response.message == "Bank Details added succesfully.")
        {
          this.bankDetails = {};
          this.getBankAccount();
          this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
    });
  }
  deleteBankAccount()
  {
    var userId=this.commonService.getCookieValues("userid");
    var bankId = this.userBankDetail.id;
    this.commonService.showLoader();
    this.httpService.deleteBankDetails(userId, bankId).subscribe(
      data => {
        this.response = data;
        if(this.response.message == "Bank Detail deleted succesfully.")
        {
          this.bankDetails = {};
          this.isBankAlreadyExist = false;
          this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
    });
  }
}
