import { Component, Input, OnInit } from '@angular/core';
import { LandingService } from '../../service/landing.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  view = false;
  data: any;
  date = new Date();

  constructor( private service: LandingService) { }

  ngOnInit() {
    this.view = this.service.view;
    this.data = this.service.data;
  }
  
  // When the user clicks on <span> (x), close the modal
  close() {
    this.view = false;
    this.service.view = false;
  }

}
