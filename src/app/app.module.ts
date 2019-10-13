//angular libraries 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule } from '@angular/forms'; 
import { DatepickerModule } from 'angular2-material-datepicker'
import { DatePipe } from '@angular/common';
import {TimeAgoPipe} from 'time-ago-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//application components 
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { NotificationComponent} from './browsetask/notification/notification.component';
import { BrowseTaskComponent } from './browsetask/browsetask.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PostTaskComponent } from './posttask/posttask.component';
import { HomeComponent } from './home/home.component';
import { TermsComponent } from './terms/terms.component';
import { CategoryListingComponent } from './category-listing/categoryListing.component';
import { CategoryDetailComponent } from './category-detail/categoryDetail.component';
import { AboutUsComponent } from './about-us/about.component';
import { HelpComponent } from './help/help.component';
import { ContactUsComponent } from './contact-us/contact.component';
import { SupportComponent } from './support/support.component';
import { ResetPasswordComponent } from './reset-password/reset.component'; // forget password pop up 
import { UpdatePasswordComponent } from './update-password/updatePassword.component'; // update password from reset link from mail 
import { ChangePasswordComponent } from './change-password/changePassword.component'; //change password by email 
import { MyTaskComponent } from './my-task/myTask.component';
import { ReporttaskComponent } from './report/report-task/reportTask.component';
import { ReportUserComponent } from './report/report-user/reportUser.component';
import { PublicProfileComponent } from './public-profile/publicProfile.component';
import { SettingComponent } from './settings/settings.component';
import { SkillsComponent } from  './skills/skills.component';
import { BlogComponent } from  './blog/blog.component';
import { BlogDetailComponent } from  './blog-detail/blog-detail.component';
import { HowItWorksComponent } from './how-it-works/howitworks.component';
import { TaskDescriptionComponent } from './my-task/taskDescription/taskDescription.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { DetailSupportComponent} from './support/articles/detail-support.component';
import {SubmitRequestComponent} from './support/submit_request/submitRequest.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { PaymentAcknowledgmentComponent } from './paymentAck/paymentAck.component';
import { PaymentHistoryComponent } from './payments/payment-history/payment-history.component';
import { PaymentMethodsComponent } from './payments/payment-methods/payment-methods.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchPipe } from './pipes/search.pipe';
import { TrustsafetyComponent } from './trustsafety/trustsafety.component';
import { BadgesComponent } from './badges/badges.component';
import { CommunityGuidelinesComponent } from './community-guidelines/community-guidelines.component';
import { EarnMoneyComponent } from './earn-money/earn-money.component';
import { PressComponent } from './press/press.component';
import { CeiboShare } from 'ng2-social-share';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider} from "angular5-social-login";
const appRoutes: Routes = [
    { path: 'browse-task', component: BrowseTaskComponent },
    { path: 'browse-task/:id', component: BrowseTaskComponent },
    { path: 'category-detail/:categoryId', component: GroupDetailComponent },
    { path: 'category-list', component: CategoryListingComponent },
    { path: 'settings', component: SettingComponent },
    { path: 'skills', component: SkillsComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile-view/:name/:id', component: PublicProfileComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'help', component: HelpComponent },
    { path: 'terms-and-conditions', component: TermsComponent },
    { path: 'privacy-policy', component: TermsComponent },
    { path: 'support', component: SupportComponent },
    { path: 'support-detail/:id', component: DetailSupportComponent },
    { path: 'how-it-works', component: HowItWorksComponent},
    { path: 'update-password' , component: UpdatePasswordComponent },
    { path: 'change-password' , component: ChangePasswordComponent },
    { path: 'my-task' , component: MyTaskComponent },
    { path: 'blogs' , component: BlogComponent },
    { path:  'blogs/:id',component: BlogDetailComponent},
    { path:  'submit-a-request',component: SubmitRequestComponent},
    { path: 'group-detail/:id',component: GroupDetailComponent},
    { path: 'payment/acknowledgement',component:PaymentAcknowledgmentComponent},
    { path: 'payment/history',component:PaymentHistoryComponent},
    { path: 'payment/payment-methods',component:PaymentMethodsComponent},
    { path: 'trust-and-safety',component:TrustsafetyComponent},
    { path: 'community-guidelines',component:CommunityGuidelinesComponent},
    { path: 'how-to-earn-money',component:EarnMoneyComponent},
    { path: 'press',component:PressComponent},
    //{ path: 'home-dashboard',component:HomeDashboardComponent}, -> delete it 
    { path: 'dashboard',component:DashboardComponent},
    { path: 'badges',component:BadgesComponent},
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '' }
  
];

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [{
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("170442017156105")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("822851222542-ehptuahe4b793cdl687q7tpp8bkoo5e1.apps.googleusercontent.com")
        }]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrowseTaskComponent,
    LoginComponent,
    SignupComponent,
    PostTaskComponent,
    //ProfileComponent,
    TermsComponent,
    CategoryListingComponent,
    CategoryDetailComponent,
    AboutUsComponent,
    HelpComponent,
    ContactUsComponent,
    SupportComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    ChangePasswordComponent,
    TimeAgoPipe,
    MyTaskComponent,
    ReporttaskComponent,
    PublicProfileComponent, 
    SettingComponent,
    SkillsComponent,
    HowItWorksComponent,
    NotificationComponent,
    BlogComponent,
    BlogDetailComponent,
    TaskDetailComponent,
    DetailSupportComponent,
    SubmitRequestComponent,
    GroupDetailComponent,
    PaymentAcknowledgmentComponent,
    PaymentHistoryComponent,
    DashboardComponent,
    SearchPipe,
    TrustsafetyComponent,
    BadgesComponent,
    CommunityGuidelinesComponent,
    EarnMoneyComponent,
    PressComponent,
    ReportUserComponent,
    PaymentMethodsComponent,
    CeiboShare
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,{ useHash: true }),
    HttpModule, 
    ReactiveFormsModule,
    DatepickerModule ,
    BrowserAnimationsModule,
    SocialLoginModule
    
  ],
  
  providers: [CookieService , DatePipe,  {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})

 
export class AppModule { }
