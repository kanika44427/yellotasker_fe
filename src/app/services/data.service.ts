import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class DataService {
  ConfigData : any;
  apiResponse : any;
  userData : any; 
  constructor(private httpService: HttpService) { }

  getConfigData(){
    if(!this.ConfigData){
      this.setConfigData();
    }
    else{
      console.log("this config", this.ConfigData);
      return this.ConfigData;
    }  
  }
  setUserData(data){
    this.userData = data; 
  }
  getUserData(){
    return this.userData;  
  }
  setConfigData(){
    this.httpService.getConfig().subscribe(data => {
      this.apiResponse = data;
      if(this.apiResponse && this.apiResponse.status == 1){
        this.ConfigData = this.apiResponse.data;
        return this.ConfigData;
      }});
  }

}
