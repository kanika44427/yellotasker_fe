import { Component , OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import {AppComponent} from '../app.component';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'routing-root',
  templateUrl: './support.component.html',
  providers: [HttpService, CommonService] 
})
export class SupportComponent  implements OnInit {
  parentComponent : any;
  apiResponse : any;
  supportList :any;
  articles:any;
  query : any;
  constructor(private inj:Injector, private httpService: HttpService, private commonService: CommonService, private router: Router){
    this.parentComponent = this.inj.get(AppComponent);
    
  }
  ngOnInit() {
    window.scrollTo(0,0);
    this.query = "";
    this.commonService.showLoader();
    this.httpService.getSupportList().subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Article list')
        {
          this.supportList = this.apiResponse.data;
          this.articles=this.supportList.article;
          this.commonService.hideLoader();
        } else {
          this.commonService.showLoader(); 
        }
    });
  }

    navigateArticleDetail(id)
    {
      this.router.navigateByUrl('/support-detail/'+id);
    }
}