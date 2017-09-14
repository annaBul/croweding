import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  moduleId: module.id,
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class  RegistrationComponent{
  username: string ="d";
  email: string ="d@f.f";
  password: string = "d";
  error: string = "";
  
  constructor(private loginService:LoginService) { 
    var newUser = {
      username: this.username,
      email: this.email,
      password: this.password,
  }
  console.log('a');
  }

  registerNewUser($event): void{
    this.error = "";
    event.preventDefault();
    
    var newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
    }
    

    this.loginService.registerNewUser(newUser)
        .subscribe(res => {
          if(res.error){
             this.error = res.error;
          } else {
            this.username = "";
            this.email ="";
            this.password = "";

          }
        });
  }

}