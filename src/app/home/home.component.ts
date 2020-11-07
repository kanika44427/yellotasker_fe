import { Component, OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import {AppComponent} from '../app.component';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';
@Component({
  selector: 'routing-root',
  templateUrl: './home.component.html',
  providers: [HttpService, CommonService] 
})
export class HomeComponent implements OnInit{
    parentComponent : any;
     apiResponse : any;
     taskList : any ;
     categoryList :any;
     how_1 : any;
     how_2 : any;
     how_3 : any;  
     how_1_full : any;
     how_2_full : any;
     how_3_full : any;
   constructor(private inj:Injector, private httpService: HttpService, private commonService: CommonService){
        this.parentComponent = this.inj.get(AppComponent);
        
    }
    ngOnInit() {
      this.how_1_full = false;
      this.how_2_full = false;
      this.how_3_full = false;
      this.how_1 = "Yello! It’s simple, secure and free to post any tasks";
      this.how_2 = "Review quotes and select the best Tasker";
      this.how_3 = "Yaaay! Release the money held in escrow when your task is done. Link the word escrow to the trust and security page";

     this.commonService.showLoader();
     this.httpService.getLatestPostedTask().subscribe(
      data => {
        this.apiResponse = data;
        if(this.apiResponse.message == 'List of tasks.')
        {
          this.taskList = this.apiResponse.data;
          this.commonService.hideLoader();
          console.log(this.taskList );
        }
    });
    this.httpService.getCategory().subscribe(
      data => {
        this.apiResponse = data;
        this.commonService.showLoader();
        if(this.apiResponse.message == 'Category dashboard list')
        {
          this.categoryList=this.apiResponse .data;
          this.commonService.hideLoader();
        }
        else{
        //   this.commentIndicator = false;
           this.commonService.hideLoader();
        }
    });
  }
    openPostTask(cat)
    {
      this.parentComponent.openPostTaskPopup(cat);
    }
    how_1_read_more()
    {
      this.how_1_full = true;
    }
    how_2_read_more()
    {
      this.how_2_full = true;
    }
    how_3_read_more()
    {
      this.how_3_full = true;
    }
}
