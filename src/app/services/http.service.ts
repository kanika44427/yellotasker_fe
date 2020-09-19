import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import {sign} from '../models/user.interface';

@Injectable()
export class HttpService {
     // Resolve HTTP using the constructor
     constructor (private http: Http) {}
     // private instance variable to hold base url
     private API_ENDPOINT_UAT = 'https://api.yellotasker.com/api/v1/';

     login(user : any) : Observable<any[]>  {
        //let bodyString = JSON.stringify(user); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        // Parameters obj-
         let params: URLSearchParams = new URLSearchParams();
        params.set('email',  user.email);
        params.set('password', user.password);

        options.params = params;
        return this.http.get(this.API_ENDPOINT_UAT + 'user/login', options)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                    console.log('error within catch is ' + Response)
                    if(error.status === 404)
                        return Observable.throw('not found error');

                    return Observable.throw('app error');
                    });

        }
      //set link to inbox
      forgetPassword(user : any) : Observable<any[]>  {
        //let bodyString = JSON.stringify(user); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        // Parameters obj-
         let params: URLSearchParams = new URLSearchParams();
        params.set('email',  user.email);

        options.params = params;
        return this.http.get(this.API_ENDPOINT_UAT + 'user/forgotPassword', options)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                    console.log('error within catch is ' + Response)
                    if(error.status === 404)
                        return Observable.throw('not found error');

                    return Observable.throw('app error');
                    });
        }

      //change password after clicking link on reset password
     resetPassword(user : any) : Observable<any[]>  {
        let bodyString = JSON.stringify(user); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.API_ENDPOINT_UAT + 'password/reset', user , options)
                         .map((res:Response) =>  res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        }

       
       //dashboard
       dashboard(userid) : Observable<any[]>  {
        return this.http.get(this.API_ENDPOINT_UAT + 'userDashboard/'+ userid)
        // ...and calling .json() on the response to return data
         .map((res:Response) =>  res.json())
         //...errors if any
         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

      //press
      getPress() : Observable<any[]>  {
        return this.http.get(this.API_ENDPOINT_UAT + 'getPress')
        // ...and calling .json() on the response to return data
         .map((res:Response) =>  res.json())
         //...errors if any
         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }


    //change password on by email
     changePassword(user : any) : Observable<any[]>  {
        let bodyString = JSON.stringify(user); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.API_ENDPOINT_UAT + 'user/updatePassword', user , options)
                         .map((res:Response) =>  res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        }
     signup(user : Object) : Observable<any[]>
     {
        let bodyString = JSON.stringify(user); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.API_ENDPOINT_UAT + 'user/signup', user , options)
                         .map((res:Response) =>  res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
     }

     posttask(task : Object) : Observable<any[]>
     {
        let bodyString = JSON.stringify(task); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.API_ENDPOINT_UAT + 'postTask/createTask', task , options)
                         .map((res:Response) =>  res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
     }

     //add bank 
     addBankDetails(bankDetails) : Observable<any[]>  {
        return this.http.get(this.API_ENDPOINT_UAT + 'user/bank_detail/add?userId='+ bankDetails.userId
        + "&bankName=" + bankDetails.bankName + "&accountName=" + bankDetails.accountName + 
        "&accountNumber="+ bankDetails.accountNumber + "&ifscCode=" + bankDetails.ifscCode + 
        "&bankBranch=" + bankDetails.bankBranch )
        // ...and calling .json() on the response to return data
         .map((res:Response) =>  res.json())
         //...errors if any
         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }


      postComment(comment : Object) : Observable<any[]>
     {
        let bodyString = JSON.stringify(comment); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.API_ENDPOINT_UAT + 'comment/post', comment , options)
                         .map((res:Response) =>  res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
     }

     replyComment(comment : Object) : Observable<any[]>
     {
        let bodyString = JSON.stringify(comment); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.API_ENDPOINT_UAT + 'comment/post?commentReply=yes', comment , options)
                         .map((res:Response) =>  res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
     }

     browseAllItems(pageNum : number) : Observable<any[]> {
         // ...using get request
         return this.http.get(this.API_ENDPOINT_UAT + 'getPostTask?page_size=10&page_num=' + pageNum + '&taskStatus=open')
                        // ...and calling .json() on the response to return data
                         .map((res:Response) =>  res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }
     getUserOutgoingHistory(userId : string) : Observable<any[]> {
        // ...using get request
        return this.http.get(this.API_ENDPOINT_UAT + 'user/payments-histroy/outgoing?userId='+userId + 'page_size=20&page_num=1')
                       // ...and calling .json() on the response to return data
                        .map((res:Response) =>  res.json())
                        //...errors if any
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }
    getUserIncomingHistory(userId : string) : Observable<any[]> {
        // ...using get request
        return this.http.get(this.API_ENDPOINT_UAT + 'user/payments-histroy/earned?userId='+userId + 'page_size=20&page_num=1')
                       // ...and calling .json() on the response to return data
                        .map((res:Response) =>  res.json())
                        //...errors if any
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }
     getLatestPostedTask() : Observable<any[]> {
         return this.http.get(this.API_ENDPOINT_UAT + 'getPostTask?limit=8&taskStatus=open')
                        // ...and calling .json() on the response to return data
                         .map((res:Response) =>  res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }
      getAllComment(taskId) : Observable<any[]> {
         return this.http.get(this.API_ENDPOINT_UAT + 'comment/post?getCommentBy=task&taskId='+ taskId)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) =>  res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }
       offerPosting(offerObject : Object) : Observable<any[]> {

         let bodyString = JSON.stringify(offerObject); // Stringify payload
         let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
         let options       = new RequestOptions({ headers: headers }); // Create a request option
              return this.http.post(this.API_ENDPOINT_UAT + 'makeOffer', offerObject , options)
                      .map((res:Response) =>  res.json())
                          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

       }
       userList(taskId : Object) : Observable<any[]> {
        return this.http.get(this.API_ENDPOINT_UAT + 'taskOffer/' + taskId)
                      .map((res:Response) =>  res.json())
                          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

       }
       getCategory() : Observable<any[]> {
        return this.http.get(this.API_ENDPOINT_UAT + 'categoryDashboard')
                      .map((res:Response) =>  res.json())
                          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

       }
       getCategoryList(): Observable<any[]> {
        return this.http.get(this.API_ENDPOINT_UAT + 'category')
                      .map((res:Response) =>  res.json())
                          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

       }
       getReason() : Observable<any[]> {
        return this.http.get(this.API_ENDPOINT_UAT + 'getReason')
                      .map((res:Response) =>  res.json())
                          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

       }
       getBankDetails(userId) : Observable<any[]> {
        return this.http.get(this.API_ENDPOINT_UAT + 'user/bank_detail/list?userId='+ userId)
                      .map((res:Response) =>  res.json())
                          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

       }
       deleteBankDetails(userId, bankId) : Observable<any[]> {
        return this.http.get(this.API_ENDPOINT_UAT + 'user/bank_detail/delete?userId='+ userId + '&bankId=' + bankId)
                      .map((res:Response) =>  res.json())
                          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

       }
       reportuser(reportObject : Object) : Observable<any[]> {
        
                 let bodyString = JSON.stringify(reportObject); // Stringify payload
                 let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
                 let options       = new RequestOptions({ headers: headers }); // Create a request option
                      return this.http.post(this.API_ENDPOINT_UAT + 'report/user', reportObject , options)
                              .map((res:Response) =>  res.json())
                                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
               }
    //    getReportByUserId() : Observable<any[]> {
    //     return this.http.get(this.API_ENDPOINT_UAT + 'getReport/user/'+ userId)
    //                   .map((res:Response) =>  res.json())
    //                       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    //    }
       getReportByTaskId() : Observable<any[]> {
        return this.http.get(this.API_ENDPOINT_UAT + 'categoryDashboard')
                      .map((res:Response) =>  res.json())
                          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

       }
       // save job
       saveTask(saveJobObject : Object) : Observable<any[]> {
        
                 let bodyString = JSON.stringify(saveJobObject); // Stringify payload
                 let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
                 let options       = new RequestOptions({ headers: headers }); // Create a request option
                      return this.http.post(this.API_ENDPOINT_UAT + 'saveTask', saveJobObject , options)
                              .map((res:Response) =>  res.json())
                                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
               }
        getSaveTask(userId : Object) : Observable<any[]> {
                return this.http.get(this.API_ENDPOINT_UAT + 'getSaveTask/' + userId)
                              .map((res:Response) =>  res.json())
                                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
               }       
        getPostedTask(userId : Object,taskType: Object) : Observable<any[]> {
            return this.http.get(this.API_ENDPOINT_UAT + 'getUserTask/' + userId+'?action='+ taskType)
                          .map((res:Response) =>  res.json())
                              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
           }        
           deactivateAcc(userId : Object) : Observable<any[]> {
            return this.http.get(this.API_ENDPOINT_UAT + 'account/deactivate/' + userId)
                          .map((res:Response) =>  res.json())
                              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
           }    
           getUserProfile(userId : Object) : Observable<any[]> {
            return this.http.get(this.API_ENDPOINT_UAT + 'userDetail/' + userId)
                          .map((res:Response) =>  res.json())
                              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
           }  
           getUserPublicProfile(userId : Object) : Observable<any[]> {
            return this.http.get(this.API_ENDPOINT_UAT + 'getPublicProfile/' + userId)
                          .map((res:Response) =>  res.json())
                              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
           }  
           saveUserProfile(settingObj :Object,userId: Object) : Observable<any[]> {
            let bodyString = JSON.stringify(settingObj); // Stringify payload
            let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options       = new RequestOptions({ headers: headers }); // Create a request option
                 return this.http.post(this.API_ENDPOINT_UAT + 'user/updateProfile/'+ userId, settingObj , options)
                          .map((res:Response) =>  res.json())
                              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
           } 
           updatePostTask(postObj :Object) : Observable<any[]> {
            let bodyString = JSON.stringify(postObj); // Stringify payload
            let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options       = new RequestOptions({ headers: headers }); // Create a request option
                 return this.http.post(this.API_ENDPOINT_UAT + 'updatePostTask',postObj , options)
                          .map((res:Response) =>  res.json())
                              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
           } 
           getPostTaskById(taskId: any) : Observable<any[]> {
            return this.http.get(this.API_ENDPOINT_UAT + 'getPostTask?taskId='+taskId)
                           // ...and calling .json() on the response to return data
                            .map((res:Response) =>  res.json())
                            //...errors if any
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   
        }
        getLatestTask() : Observable<any[]> {
            return this.http.get(this.API_ENDPOINT_UAT + 'getPostTask?limit=10&taskStatus=open')
                           // ...and calling .json() on the response to return data
                            .map((res:Response) =>  res.json())
                            //...errors if any
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   
        }
        /*get the task by time duration */
        getTaskbyTime(time:any) : Observable<any[]> {
            return this.http.get(this.API_ENDPOINT_UAT + 'getPostTask?'+time+'=1')
                           // ...and calling .json() on the response to return data
                            .map((res:Response) =>  res.json())
                            //...errors if any
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   
        }
        /*delete saved task */
        deleteSavedTask(savedTaskObj:any): Observable<any[]> {
            let bodyString = JSON.stringify(savedTaskObj); // Stringify payload
            let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options       = new RequestOptions({ headers: headers });
            return this.http.post(this.API_ENDPOINT_UAT + 'saveTask/delete',savedTaskObj,options)
                           // ...and calling .json() on the response to return data
                            .map((res:Response) =>  res.json())
                            //...errors if any
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   
        }
        // delete offer
        deleteOffer(param:any): Observable<any[]> {
            let bodyString = JSON.stringify(param); // Stringify payload
            let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options       = new RequestOptions({ headers: headers });
            return this.http.post(this.API_ENDPOINT_UAT + 'deleteOffer',param,options)
                           // ...and calling .json() on the response to return data
                            .map((res:Response) =>  res.json())
                            //...errors if any
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   
        }
        /* get list of blogs */
        getblogs(pageNum:any,type:any,category:any): Observable<any[]> {
            return this.http.get(this.API_ENDPOINT_UAT + 'getBlog?page_size=5&page_num=' + pageNum + '&type=' + type + '&category=' + category)
                           // ...and calling .json() on the response to return data
                            .map((res:Response) =>  res.json())
                            //...errors if any
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   
        }
         /*get the task by budget */
         getTaskbyBudget(budget:any) : Observable<any[]> {
            let bodyString = JSON.stringify(budget); // Stringify payload
            let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options       = new RequestOptions({ headers: headers });
            return this.http.get(this.API_ENDPOINT_UAT + 'getPostTask' + budget)
                           // ...and calling .json() on the response to return data
                            .map((res:Response) =>  res.json())
                            //...errors if any
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   
        }
        /* get posted task */
        getPostedTaskById(userid:any) : Observable<any[]> {
            let bodyString = JSON.stringify(userid); // Stringify payload
            let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options       = new RequestOptions({ headers: headers });
            return this.http.post(this.API_ENDPOINT_UAT + 'getPostTask',userid,options)
                           // ...and calling .json() on the response to return data
                            .map((res:Response) =>  res.json())
                            //...errors if any
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   
        }
        /* get pending offers */
        getPendingOffer(userid:any){
            let bodyString = JSON.stringify(userid); // Stringify payload
            let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options       = new RequestOptions({ headers: headers });
            return this.http.post(this.API_ENDPOINT_UAT + 'getMyPendingOffers',userid,options)
                           // ...and calling .json() on the response to return data
                            .map((res:Response) =>  res.json())
                            //...errors if any
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));  
        }
        //get blog detail
        getBlogDetail(blogid:any){
            let bodyString = JSON.stringify(blogid); // Stringify payload
            let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options       = new RequestOptions({ headers: headers });
            return this.http.post(this.API_ENDPOINT_UAT + 'getBlog',blogid,options)
                           // ...and calling .json() on the response to return data
                            .map((res:Response) =>  res.json())
                            //...errors if any
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));  
        }
        // assign task
        assignTask(param:any){
            let bodyString = JSON.stringify(param); // Stringify payload
            let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options       = new RequestOptions({ headers: headers });
            return this.http.post(this.API_ENDPOINT_UAT + 'assignTask',param,options)
                           // ...and calling .json() on the response to return data
                            .map((res:Response) =>  res.json())
                            //...errors if any
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));  
        }
         // notification api
         notifications(){
            return this.http.get(this.API_ENDPOINT_UAT + 'notifications')
            // ...and calling .json() on the response to return data
             .map((res:Response) =>  res.json())
             //...errors if any
             .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
        }
        makePayment(param : Object) : Observable<any[]> {
            
                     let bodyString = JSON.stringify(param); // Stringify payload
                     let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
                     let options       = new RequestOptions({ headers: headers }); // Create a request option
                          return this.http.post(this.API_ENDPOINT_UAT + 'molpay', param , options)
                                  .map((res:Response) =>  res.json())
                                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
            
                   }
                   makeMolPayment(param : Object) : Observable<any[]> {
                    
                             let bodyString = JSON.stringify(param); // Stringify payload
                             let headers      = new Headers({ 'Content-Type': 'application/json'}); // ... Set content type to JSON
                             headers.append('Access-Control-Allow-Origin','*');
                             let options       = new RequestOptions({ headers: headers }); // Create a request option
                                  return this.http.post('https://sandbox.molpay.com/MOLPay/pay/SB_yellotasker/', bodyString , options)
                                          .map((res:Response) =>  res.json())
                                              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
                    
                           }
            getSupportList(){
                return this.http.get(this.API_ENDPOINT_UAT + 'supportListing')
                // ...and calling .json() on the response to return data
                 .map((res:Response) =>  res.json())
                 //...errors if any
                 .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
            }
            getDetailSupport(supportId:any) {
                return this.http.get(this.API_ENDPOINT_UAT + 'getArticle/'+ supportId)
                // ...and calling .json() on the response to return data
                 .map((res:Response) =>  res.json())
                 //...errors if any
                 .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
            }
            submitRequest(param:any): Observable<any[]> {
                
                         let bodyString = JSON.stringify(param); // Stringify payload
                         let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
                         let options       = new RequestOptions({ headers: headers }); // Create a request option
                              return this.http.post(this.API_ENDPOINT_UAT + 'submitSupportRequest', param , options)
                                      .map((res:Response) =>  res.json())
                                          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
                
            }
            getRelatedArticle(supportId:any) {
                return this.http.get(this.API_ENDPOINT_UAT + 'getRelatedArticle/'+ supportId)
                // ...and calling .json() on the response to return data
                 .map((res:Response) =>  res.json())
                 //...errors if any
                 .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
            }
            getArticleCategory(){
                return this.http.get(this.API_ENDPOINT_UAT + 'getArticleCategory')
                // ...and calling .json() on the response to return data
                 .map((res:Response) =>  res.json())
                 //...errors if any
                 .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
            }
            deleteComment(param:any): Observable<any[]> {
                
                         let bodyString = JSON.stringify(param); // Stringify payload
                         let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
                         let options       = new RequestOptions({ headers: headers }); // Create a request option
                              return this.http.post(this.API_ENDPOINT_UAT + 'comment/delete', param , options)
                                      .map((res:Response) =>  res.json())
                                          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
                
            }
            otherCategoryList(categoryId : Object) : Observable<any[]> {
                return this.http.get(this.API_ENDPOINT_UAT + 'otherCategory?categoryId='+ categoryId)
                              .map((res:Response) =>  res.json())
                                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
               } 
            otherGroupCategoryList(groupId : Object) : Observable<any[]> {
                return this.http.get(this.API_ENDPOINT_UAT + 'otherCategory?groupId='+ groupId)
                              .map((res:Response) =>  res.json())
                                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
               }
            recentlyPostedTaskByGroupCategory(groupId : Object) : Observable<any[]> {
                return this.http.get(this.API_ENDPOINT_UAT + 'getPostTaskByGroupCategory?groupId='+ groupId)
                              .map((res:Response) =>  res.json())
                                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
               }
           recentlyPostedTaskByCategory(categoryId : Object) : Observable<any[]> {
            return this.http.get(this.API_ENDPOINT_UAT + 'getPostTaskByCategory?categoryId='+ categoryId)
                          .map((res:Response) =>  res.json())
                              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
           }
            getPostedTaskByLocation(locationType : Object) : Observable<any[]> {
                return this.http.get(this.API_ENDPOINT_UAT + 'getPostTask?locationType='+ locationType + '&taskStatus=open')
                              .map((res:Response) =>  res.json())
                                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
               } 
            updateOffer(param:any,id:any): Observable<any[]> {
                         let bodyString = JSON.stringify(param); // Stringify payload
                         let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
                         let options       = new RequestOptions({ headers: headers }); // Create a request option
                              return this.http.post(this.API_ENDPOINT_UAT + 'updateOffer/'+ id, param , options)
                                      .map((res:Response) =>  res.json())
                                          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
                
            }
            sendPersonalMessage(param:any): Observable<any[]> {
                let bodyString = JSON.stringify(param); // Stringify payload
                let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
                let options       = new RequestOptions({ headers: headers }); // Create a request option
                     return this.http.post(this.API_ENDPOINT_UAT + 'addPersonalMessage', param , options)
                             .map((res:Response) =>  res.json())
                                 .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
       
   }
            getPersonalMessage(taskid : Object) : Observable<any[]> {
                return this.http.get(this.API_ENDPOINT_UAT + 'getPersonalMessage?taskId='+ taskid)
                            .map((res:Response) =>  res.json())
                                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

            } 
            submitReviewRating(param:any): Observable<any[]> {
                let bodyString = JSON.stringify(param); // Stringify payload
                let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
                let options       = new RequestOptions({ headers: headers }); // Create a request option
                     return this.http.post(this.API_ENDPOINT_UAT + 'reviewRating', param , options)
                             .map((res:Response) =>  res.json())
                                 .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
       
   }
        getTransaction(id:any): Observable<any[]> {
            return this.http.get(this.API_ENDPOINT_UAT + 'getTransaction/'+ id)
            .map((res:Response) =>  res.json())
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

        }
        deletePostedTask(id:any): Observable<any[]> {
            return this.http.get(this.API_ENDPOINT_UAT + 'postTask/delete/'+ id)
            .map((res:Response) =>  res.json())
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

        }
        uploadPortfolioImage(image:any): Observable<any[]> {
            let bodyString = JSON.stringify(image); // Stringify payload
            let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options       = new RequestOptions({ headers: headers }); // Create a request option
                return this.http.post(this.API_ENDPOINT_UAT + 'uploadPortfolioImage', image , options)
                        .map((res:Response) =>  res.json())
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

        }
        getPortfolioImage(id:any): Observable<any[]> {
            let bodyString = JSON.stringify(id); // Stringify payload
            let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options       = new RequestOptions({ headers: headers }); // Create a request option
                return this.http.post(this.API_ENDPOINT_UAT + 'getPortfolioImage', id , options)
                        .map((res:Response) =>  res.json())
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

        }
        deletePortfolioImage(param:any): Observable<any[]> {
            let bodyString = JSON.stringify(param); // Stringify payload
            let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options       = new RequestOptions({ headers: headers }); // Create a request option
                return this.http.post(this.API_ENDPOINT_UAT + 'deletePortfolioImage', param , options)
                        .map((res:Response) =>  res.json())
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

        }
        changeStatus(param:any): Observable<any[]> {
            let bodyString = JSON.stringify(param); // Stringify payload
            let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options       = new RequestOptions({ headers: headers }); // Create a request option
                return this.http.post(this.API_ENDPOINT_UAT + 'taskCompleteFromDoer', param , options)
                        .map((res:Response) =>  res.json())
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

        }
        getOTP(params : any) : Observable<any[]> {
            // ...using get request
            return this.http.get(this.API_ENDPOINT_UAT + 'generateOtp?userId='+ params.userId + '&mobileNumber=' + params.mobile)
                           // ...and calling .json() on the response to return data
                            .map((res:Response) =>  res.json())
                            //...errors if any
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
        }
        sendOTP(params : any) : Observable<any[]> {
            // ...using get request
            return this.http.get(this.API_ENDPOINT_UAT + 'verifyOtp?userId='+ params.userId + '&otp=' + params.otp + '&mobile=' + params.mobile)
                           // ...and calling .json() on the response to return data
                            .map((res:Response) =>  res.json())
                            //...errors if any
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
        }
        getServiceCharges() : Observable<any[]> {
            // ...using get request
            return this.http.get(this.API_ENDPOINT_UAT + 'serviceCharge')
                           // ...and calling .json() on the response to return data
                            .map((res:Response) =>  res.json())
                            //...errors if any
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
        }
        getConfig() : Observable<any[]> {
            // ...using get request
            return this.http.get(this.API_ENDPOINT_UAT + 'config')
                           // ...and calling .json() on the response to return data
                            .map((res:Response) =>  res.json())
                            //...errors if any
                            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
        }
}
