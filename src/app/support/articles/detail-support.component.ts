import { Component , OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import {AppComponent} from './../../app.component';
import { CommonService } from './../../services/common.service';
import { HttpService } from './../../services/http.service';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'routing-root',
  templateUrl: './detail-support.component.html',
  providers: [HttpService, CommonService] 
})
export class DetailSupportComponent  implements OnInit {
  parentComponent : any;
  apiResponse : any;
  supportList :any;
  articles:any;
  supportId:any;
  relatedSupportList:any;
  constructor(private inj:Injector, private httpService: HttpService, private commonService: CommonService,private route:ActivatedRoute,private router:Router){
    this.parentComponent = this.inj.get(AppComponent);
    
  }
  ngOnInit() {
    window.scrollTo(0,0);
    this.commonService.showLoader();
    this.route.params.subscribe( params =>
      this.supportId = params['id']
    )
    this.httpService.getDetailSupport(this.supportId).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Article list')
        {
          this.supportList = this.apiResponse.data[0];
          this.getRelatedArticle(this.supportId);
        } else {
          this.commonService.hideLoader();
        }
    });
  }
  getRelatedArticle(supportId){
    this.httpService.getRelatedArticle(supportId).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Article list')
        {
          this.relatedSupportList = this.apiResponse.data;
          this.commonService.hideLoader();
        } else {
          this.commonService.hideLoader();
        }
    });
  }
}
