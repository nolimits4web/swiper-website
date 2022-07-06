import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: "app-swiper-example",
  template: ` <swiper
      style="--swiper-navigation-color: #fff;--swiper-pagination-color: #fff"
      [spaceBetween]="10"
      [navigation]="true"
      [thumbs]="{ swiper: thumbsSwiper }"
      class="mySwiper2"
    >
      <ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-1.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-2.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-3.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-4.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-5.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-6.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-7.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-8.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-9.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img src="https://swiperjs.com/demos/images/nature-10.jpg"
      /></ng-template>
    </swiper>
    <swiper
      (swiper)="thumbsSwiper = $event"
      [spaceBetween]="10"
      [slidesPerView]="4"
      [freeMode]="true"
      [watchSlidesProgress]="true"
      class="mySwiper"
    >
      <ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-1.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-2.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-3.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-4.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-5.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-6.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-7.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-8.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img
          src="https://swiperjs.com/demos/images/nature-9.jpg" /></ng-template
      ><ng-template swiperSlide
        ><img src="https://swiperjs.com/demos/images/nature-10.jpg"
      /></ng-template>
    </swiper>`,
  styleUrls: ["./app.components.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  thumbsSwiper: any;
}
