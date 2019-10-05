import { Component, OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import {AppComponent} from '../app.component';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';
import {ActivatedRoute} from '@angular/router';
import { CeiboShare } from 'ng2-social-share';
import { Router } from '@angular/router';

@Component({
  selector: 'routing-root',
  templateUrl: './blog-detail.component.html',
  providers: [HttpService, CommonService] 
})
export class BlogDetailComponent implements OnInit {
  parentComponent : any;
  apiResponse : any;
  blogs : any ;
  categoryList :any;
  id:number;
  repoUrl : string; 
  constructor(private inj:Injector, private httpService: HttpService, 
    private commonService: CommonService,private route:ActivatedRoute,
    private router: Router){
    this.parentComponent = this.inj.get(AppComponent);
    
  }
  ngOnInit() {
    this.repoUrl = 'yellotasker.com/#/' + this.router.url;
    this.commonService.showLoader();
    window.scrollTo(0,0);
    this.route.params.subscribe( params =>
      this.id = params['id']
  )
    var param={
     blogId:this.id
    }
    this.httpService.getBlogDetail(param).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'blogs found')
        {
          this.blogs=this.apiResponse .data;
          this.commonService.hideLoader();
        }
        else{
        //   this.commentIndicator = false;
           this.commonService.hideLoader();
        }
    });
  }
}
