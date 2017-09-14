import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { SupporterCardComponent } from './components/supporter-card/supporter-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponent } from './components/slider/slider.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { FundedShowcaseComponent } from './components/funded-showcase/funded-showcase.component';
import { NewsComponent } from './components/news/news.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NologinComponent } from './components/nologin/nologin.component';

import {LoginService} from './services/login.service';

const appRoutes: Routes =[
  { path: '', component: MainPageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NavbarComponent,
    CardComponent,
    SupporterCardComponent,
    FooterComponent,
    SliderComponent,
    TabsComponent,
    FundedShowcaseComponent,
    NewsComponent,
    ProfileComponent,
    LoginComponent,
    NologinComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
