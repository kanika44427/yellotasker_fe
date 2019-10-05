import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'routing-root',
  templateUrl: './about.component.html'
})
export class AboutUsComponent  implements OnInit {
  ngOnInit() {
    window.scrollTo(0,0);
  }
}
