import { Component, OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import {AppComponent} from '../app.component';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'routing-root',
  templateUrl: './paymentAck.component.html',
  providers: [HttpService, CommonService] 
})
export class PaymentAcknowledgmentComponent implements OnInit {
  parentComponent : any;
  apiResponse : any;
  blogs : any ;
  categoryList :any;
  id:any;
  transactionDetails:any;
  constructor(private inj:Injector, private httpService: HttpService, private commonService: CommonService,private route:ActivatedRoute){
    this.parentComponent = this.inj.get(AppComponent);
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe( params =>
      this.id=params['txnID']
  )
  this.httpService.getTransaction(this.id).subscribe(
    data => {
      this.apiResponse = data;
      this.commonService.showLoader();
      if(this.apiResponse.message == 'Transaction details!')
      {
        this.transactionDetails = this.apiResponse.data[0];
        this.commonService.hideLoader();
      }
      else{
         this.commonService.hideLoader();
      }
  });
  }
}
