import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProjectService} from '../../services/project.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

const CLOUDYNARY_URL = 'https://api.cloudinary.com/v1_1/dyzdll94h/image/upload';
const CLOUDYNARY_UPLOAD_PRESET = 'xmqxl2si';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css',
'./ng2-datepicker/src/ng2-datepicker/ng2-datepicker.component.sass']
})
export class CreateProjectComponent implements OnInit {

    date: DateModel;
    message;
    options: DatePickerOptions = {
      format: 'DD-MM-YYYY',
      todayText: 'Oggi',
      style: 'big'
    };
  
    currentUser;
    
    newProject ={
      title: "",
      description: "",
      completionDate: null,
      budget: 0,
      imageUrl: "http://res.cloudinary.com/dyzdll94h/image/upload/v1505994851/bngp74njkqpynfmcn1dx.jpg"
    }

    

    constructor(private projectService:ProjectService) {
      this.options = new DatePickerOptions();
      if(localStorage.getItem('currentUser')){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      } 
    }

  ngOnInit() {
  }
  
  public uploadFile(event: any) { 
    
    const file = event.target.files[0]; 
    const xhr = new XMLHttpRequest(); 
    const fd = new FormData(); 
    
    //fd.append('upload_preset', 'xmqxl2si');
    xhr.open('POST', CLOUDYNARY_URL, true); 
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
    
    xhr.onreadystatechange = (e) => { 
      if (xhr.readyState === 4 && xhr.status === 200) { 
        console.log(JSON.parse(xhr.responseText)); 
        const response = JSON.parse(xhr.responseText); 
        const imgs = document.getElementsByTagName('img'); 
        for (let i = 0; i < imgs.length; i++) { 
          const img = imgs[i]; 
          if (img.id === 'project-img') { 
            this.newProject.imageUrl = response.secure_url; 
            img.src = response.secure_url; 
            img.alt = response.public_id; 
          } 
        } 
      } 
    };
    fd.append('upload_preset', CLOUDYNARY_UPLOAD_PRESET ); 
    fd.append('file', file); 
    xhr.send(fd);  
  }

  createProject($event): void{
    event.preventDefault();
    this.newProject.completionDate = new Date( +this.date.year, +this.date.month - 1,+this.date.day);
    console.log(this.newProject.completionDate);
    this.projectService.createProject(this.newProject)
      .subscribe(res => {
        if(!res.error){  
          
         // this.router.navigate(['/user/'+this.currentUser.id+'/settings']);        
        }
        else{
          this.message = "Sorry! Some error."; 
        }
    });
  }
}
