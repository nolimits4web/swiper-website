import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { EffectFlip, Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([EffectFlip, Pagination, Navigation]);

@Component({
  selector: "app-swiper-example",
  template: `<swiper
    [effect]="'flip'"
    [grabCursor]="true"
    [pagination]="true"
    [navigation]="true"
    class="mySwiper"
  >
    <ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></ng-template
    ><ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></ng-template
    ><ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></ng-template
    ><ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-4.jpg" /></ng-template
    ><ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-5.jpg" /></ng-template
    ><ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-6.jpg"
    /></ng-template>
  </swiper>`,
  styleUrls: ["./app.components.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
