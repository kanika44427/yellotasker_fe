import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-guidelines',
  templateUrl: './community-guidelines.component.html',
  styleUrls: ['./community-guidelines.component.css']
})
export class CommunityGuidelinesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0,0);
  }

}
