import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { EffectFade, Navigation, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([EffectFade, Navigation, Pagination]);

@Component({
  selector: "app-swiper-example",
  template: `<swiper
    [spaceBetween]="30"
    [effect]="'fade'"
    [navigation]="true"
    [pagination]="{
      clickable: true
    }"
    class="mySwiper"
  >
    <ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></ng-template
    ><ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></ng-template
    ><ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></ng-template
    ><ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-4.jpg"
    /></ng-template>
  </swiper>`,
  styleUrls: ["./app.components.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
