import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'routing-root',
  templateUrl: './contact.component.html'
})
export class ContactUsComponent  implements OnInit {
  ngOnInit() {
    window.scrollTo(0,0);
  }
}
