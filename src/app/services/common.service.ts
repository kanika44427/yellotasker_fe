import { Injectable }     from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

declare var jquery:any;
declare var $ :any;

@Injectable()
export class CommonService {

cookieResult: string;
constructor( private cookieService: CookieService ) { }

showLoader()
{
    //show Loader
    $('#loading').show();
}

hideLoader()
{
    //hide Loader
    $('#loading').hide();
}

setCookieValues(cookieName, cookieValue)
{
    this.cookieService.set( cookieName, cookieValue);
}

getCookieValues(cookieName)
{
   
    const cookieExists: boolean = this.cookieService.check(cookieName);
    if(cookieExists)
    this.cookieResult = this.cookieService.get(cookieName);
    else
     this.cookieResult = null;
    return this.cookieResult;
}

deleteCookieValues(cookieName)
{
    this.cookieService.delete(cookieName);
}

getParameterByName(name,url) {
    if (!url) url =  window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

getMobileType() {
    var width_ = window.innerWidth;
    if (width_ <= 720) {
        return "MOB";
    } else if ((width_ > 720) && (width_ < 900)) {
        return "TAB";
    } else if ((width_ > 900)) {
        return "WEB";
    }
}

}