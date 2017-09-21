import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Routes, RouterModule} from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';
import {DropdownModule} from "ng2-dropdown";
import {TabsModule} from "ng2-tabs";
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { DatePickerModule } from 'ng2-datepicker';

import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';
import {ProjectService} from './services/project.service';

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
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { UserComponent } from './components/user/user.component';
import { ProjectComponent } from './components/project/project.component';
import { AdminComponent } from './components/admin/admin.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingsGuard }   from './components/settings/settings.guard';

const appRoutes: Routes =[
  { path: '', component: MainPageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'create_project', component: CreateProjectComponent},
  { path: 'user/:id', component: UserComponent, pathMatch:'full'},
  { path: 'user/:id/settings', component: SettingsComponent, canActivate: [SettingsGuard], pathMatch:'full'},
  { path: 'project/:title', component: ProjectComponent, pathMatch:'full'},
  { path: 'admin', component: AdminComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
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
    CreateProjectComponent,
    UserComponent,
    ProjectComponent,
    AdminComponent,
    SettingsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(appRoutes),
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    DropdownModule,
    TabsModule,
    DatePickerModule,
  ],
  providers: [
    LoginService,
    UserService,
    ProjectService,
    SettingsGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
