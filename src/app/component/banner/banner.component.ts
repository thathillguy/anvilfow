import { Component, Input } from '@angular/core';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.less']
})
export class BannerComponent {
  @Input() displayText: string = "";
  @Input() bannerImage: string = "";

  ngOnInit() {
  }
}
