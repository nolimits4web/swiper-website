import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

@Component({
  selector: "app-swiper-example",
  template: `<swiper
    [effect]="'coverflow'"
    [grabCursor]="true"
    [centeredSlides]="true"
    [slidesPerView]="'auto'"
    [coverflowEffect]="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    }"
    [pagination]="true"
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
      ><img src="https://swiperjs.com/demos/images/nature-6.jpg" /></ng-template
    ><ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-7.jpg" /></ng-template
    ><ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-8.jpg" /></ng-template
    ><ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-9.jpg"
    /></ng-template>
  </swiper>`,
  styleUrls: ["./app.components.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
