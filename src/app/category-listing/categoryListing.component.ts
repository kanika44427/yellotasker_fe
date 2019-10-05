import { Component , OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import {AppComponent} from '../app.component';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'routing-root',
  templateUrl: './categoryListing.component.html',
  providers: [HttpService, CommonService] 
})
export class CategoryListingComponent  implements OnInit {
  parentComponent : any;
  apiResponse : any;
  categoryList :any;
  constructor(private inj:Injector, private httpService: HttpService, private commonService: CommonService){
    this.parentComponent = this.inj.get(AppComponent);
    
  }
  ngOnInit() {
    window.scrollTo(0,0);
    this.httpService.getCategoryList().subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'Category dashboard list')
        {
          this.categoryList = this.apiResponse.data;
          this.commonService.hideLoader();
          console.log(this.categoryList );
        }
    });
  }
}
