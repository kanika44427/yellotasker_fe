import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-earn-money',
  templateUrl: './earn-money.component.html',
  styleUrls: ['./earn-money.component.css']
})
export class EarnMoneyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0,0);
  }

}
