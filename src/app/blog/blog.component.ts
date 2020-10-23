import { Component , OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import {AppComponent} from '../app.component';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';
import {ReversePipe} from '../pipes/reversePipes';
import { Router } from '@angular/router';
@Component({
  selector: 'routing-root',
  templateUrl: './blog.component.html',
  providers: [HttpService, CommonService,ReversePipe] 
})

export class BlogComponent  implements OnInit {
  parentComponent : any;
  apiResponse : any;
  blogs:any;
  gridBlog:boolean;
  listBlog:boolean;
  pageNum:any;
  type:any;
  category:any;
  hideSeeMore:boolean;
  catList:any;
  query : any;
  constructor(private router : Router, private inj:Injector, private httpService: HttpService, private commonService: CommonService,private reversePipe: ReversePipe){
    this.parentComponent = this.inj.get(AppComponent);
    this.category='';
    this.type='';
    this.getCategory();
    this.getblogs('','');
    this.query = "";
    
}
navigateArticleDetail(id)
{
  this.router.navigateByUrl('/blogs/'+id);
}
getblogs(cat,type){
  this.commonService.showLoader();
  this.pageNum=1;
  this.type=type=='topic'?cat:this.type;
  this.category=type=='cat'?cat:this.category;
  this.httpService.getblogs(this.pageNum,this.type,this.category).subscribe(
    data => {
      this.apiResponse = data;
      if(this.apiResponse.message == 'blogs found')
      {
        this.blogs=this.apiResponse.data;
        this.commonService.hideLoader();
      }
      else if(this.apiResponse.message == 'all blogs'){
          this.blogs=this.apiResponse.data ? this.apiResponse.data[0] : [];
        console.log(this.blogs)
        this.commonService.hideLoader();
      }
      else{
         this.blogs = [];
         this.commonService.hideLoader();
      }
  });
}
  getCategory(){
    this.httpService.getCategoryList().subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Category dashboard list')
        {
          this.catList=this.apiResponse.data;
          this.commonService.hideLoader();
        }
        else{
           this.commonService.hideLoader();
        }
    });
  }
  ngOnInit() {
  window.scrollTo(0,0);
  this.listBlog=true;
  }
  showBlog(type){
    this.gridBlog=type=='grid'?true:false;
    this.listBlog=type=='list'?true:false;
  }
  getMoreBlogs(cat,type)
  {
    this.pageNum = this.pageNum + 1;
  //  this.type=type=='topic'?cat:this.type;
  //  this.category=type=='cat'?cat:this.category;
    this.commonService.showLoader();
     this.httpService.getblogs(this.pageNum,this.type,this.category).subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'blogs found')
        {
          this.reversePipe.transform(this.apiResponse.data);
          this.blogs = this.blogs.concat(this.apiResponse.data);
          this.commonService.hideLoader();
        } else {
          this.hideSeeMore=true;
          this.commonService.hideLoader();
        }
    });
  }
}
