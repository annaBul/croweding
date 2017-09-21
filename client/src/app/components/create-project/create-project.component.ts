import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProjectService} from '../../services/project.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css',
'./ng2-datepicker/src/ng2-datepicker/ng2-datepicker.component.sass']
})
export class CreateProjectComponent implements OnInit {

    date: DateModel;
    options: DatePickerOptions = {
      format: 'DD-MM-YYYY',
      todayText: 'Oggi',
      style: 'big'
    };
  
    newProject ={
      title: "",
      description: "",
      completionDate: Date,
      budget: Number
    }

    constructor() {
      this.options = new DatePickerOptions();
    }

  ngOnInit() {
  }

}
