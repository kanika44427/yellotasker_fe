import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'routing-root',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.css'],
  providers: [HttpService, CommonService] 
})
export class PressComponent implements OnInit {
  apiResponse : any;
  press : any;
  constructor(private httpService: HttpService,private commonService: CommonService) { 
   
  }

  ngOnInit() {
    window.scrollTo(0,0);
    this.getPress();
  }

  getPress()
  {
    this.commonService.showLoader();
    this.httpService.getPress().subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Press detail found')
        {
          this.press=this.apiResponse.data;
          this.commonService.hideLoader();
        }
        else{
           this.press = [];
           this.commonService.hideLoader();
        }
    });
  }
}
