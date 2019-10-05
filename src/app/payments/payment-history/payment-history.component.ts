import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css'],
  providers: [HttpService, CommonService] 
})
export class PaymentHistoryComponent implements OnInit {

  constructor(private httpService: HttpService,private commonService: CommonService) { }
  earnedIndicator : any;
  apiOutgoingResponse : any;
  outgoingHistoryList : any;
  apiIncomingResponse : any;
  incomingHistoryList : any;
  netEarned : any;
  netEarnedCaption : any;
  ngOnInit() {
    this.earnedIndicator = false;
    this.getUserOutgoingHistory();
    this.getUserIncomingHistory();
  }
 
  getPaymentHistory(paymentType)
  {
   if(paymentType == "Earned")
   {
     this.earnedIndicator = true;
   }
   if(paymentType == "Outgoing")
   {
    this.earnedIndicator = false;
   }
  }
  getUserOutgoingHistory()
  {
    let userId=this.commonService.getCookieValues("userid");
    this.commonService.showLoader();
    this.httpService.getUserOutgoingHistory(userId).subscribe(
      data => {
        this.apiOutgoingResponse = data;
        this.getNetEarnedamount(this.apiOutgoingResponse);
        if(this.apiOutgoingResponse.message == 'Payment histroy found.')
        {
          this.outgoingHistoryList=this.apiOutgoingResponse.data.outgoing;
          this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
    });
  }
  getUserIncomingHistory()
  {
    let userId=this.commonService.getCookieValues("userid");
    this.commonService.showLoader();
    this.httpService.getUserIncomingHistory(userId).subscribe(
      data => {
        this.apiIncomingResponse = data;
        if(this.apiIncomingResponse.message == 'Payment histroy found.')
        {
          this.incomingHistoryList=this.apiIncomingResponse.data;
          this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
    });
  }
  getNetEarnedamount(outgoingResponse)
  {
    var incoming = +outgoingResponse.net_incoming;
    if(outgoingResponse.net_outgoing > incoming)
    {
       this.netEarned = outgoingResponse.net_outgoing - incoming;
       this.netEarnedCaption = "Net spend";
    }
    else if(incoming > outgoingResponse.net_outgoing)
    {
      this.netEarned = incoming - outgoingResponse.net_outgoing;
      this.netEarnedCaption = "Net earned";
    }
    else
    {
      this.netEarned = 0.00;
      this.netEarnedCaption = "Net earned";
    }
  }
}
