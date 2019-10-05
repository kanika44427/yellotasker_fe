import { Component , OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import {AppComponent} from '../app.component';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'routing-root',
  templateUrl: './categoryDetail.component.html',
  providers: [HttpService, CommonService] 
})
export class CategoryDetailComponent  implements OnInit {
  parentComponent : any;
  apiResponse : any;
  taskList : any ;
  categoryList :any;
  id:number;
  constructor(private inj:Injector, private httpService: HttpService, private commonService: CommonService,private route:ActivatedRoute){
    this.parentComponent = this.inj.get(AppComponent);
    
  }
  ngOnInit() {
    window.scrollTo(0,0);
    this.route.params.subscribe( params =>
      this.id = params['id']
  )
    this.httpService.getCategory().subscribe(
      data => {
        this.apiResponse = data;
        this.commonService.showLoader();
        if(this.apiResponse.message == 'Category dashboard list')
        {
          this.categoryList=this.apiResponse .data;
          console.log('cat',this.categoryList);
          this.commonService.hideLoader();
        }
        else{
        //   this.commentIndicator = false;
           this.commonService.hideLoader();
        }
    });
  }
}
