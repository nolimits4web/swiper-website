import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Lazy, Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Lazy, Pagination, Navigation]);

@Component({
  selector: "app-swiper-example",
  template: ` <swiper
    style="--swiper-navigation-color: #fff;--swiper-pagination-color: #fff"
    [lazy]="true"
    [pagination]="{
      clickable: true
    }"
    [navigation]="true"
    class="mySwiper"
  >
    <ng-template swiperSlide>
      <img
        data-src="https://swiperjs.com/demos/images/nature-1.jpg"
        class="swiper-lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </ng-template
    ><ng-template swiperSlide>
      <img
        data-src="https://swiperjs.com/demos/images/nature-2.jpg"
        class="swiper-lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </ng-template
    ><ng-template swiperSlide>
      <img
        data-src="https://swiperjs.com/demos/images/nature-3.jpg"
        class="swiper-lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </ng-template
    ><ng-template swiperSlide>
      <img
        data-src="https://swiperjs.com/demos/images/nature-4.jpg"
        class="swiper-lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </ng-template
    ><ng-template swiperSlide>
      <img
        data-src="https://swiperjs.com/demos/images/nature-5.jpg"
        class="swiper-lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </ng-template
    ><ng-template swiperSlide>
      <img
        data-src="https://swiperjs.com/demos/images/nature-6.jpg"
        class="swiper-lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </ng-template
    ><ng-template swiperSlide>
      <img
        data-src="https://swiperjs.com/demos/images/nature-7.jpg"
        class="swiper-lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </ng-template
    ><ng-template swiperSlide>
      <img
        data-src="https://swiperjs.com/demos/images/nature-8.jpg"
        class="swiper-lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </ng-template
    ><ng-template swiperSlide>
      <img
        data-src="https://swiperjs.com/demos/images/nature-9.jpg"
        class="swiper-lazy"
      />
      <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
    </ng-template>
  </swiper>`,
  styleUrls: ["./app.components.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
