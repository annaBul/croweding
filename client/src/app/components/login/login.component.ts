import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  email: string ="";
  password: string = "";
  error: string = "";
  
  
  constructor(private loginService:LoginService) { 
    this.error ="";
  }

  login($event): void{
    event.preventDefault();
    
    var user = {
      email: this.email,
      password: this.password,
    }
    console.log('a');

    this.loginService.login(user)
        .subscribe(res => {
          if(res.error){
            this.error = res.error;
         } else {
           this.email ="";
           this.password = "";

         }
        });
  }

}
