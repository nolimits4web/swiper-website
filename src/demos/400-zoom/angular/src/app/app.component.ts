import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Zoom, Navigation, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Zoom, Navigation, Pagination]);

@Component({
  selector: "app-swiper-example",
  template: ` <swiper
    style="--swiper-navigation-color: #fff;--swiper-pagination-color: #fff"
    [zoom]="true"
    [navigation]="true"
    [pagination]="{
      clickable: true
    }"
    class="mySwiper"
  >
    <ng-template swiperSlide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
      </div> </ng-template
    ><ng-template swiperSlide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
      </div> </ng-template
    ><ng-template swiperSlide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
      </div> </ng-template
    ><ng-template swiperSlide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
      </div> </ng-template
    ><ng-template swiperSlide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
      </div> </ng-template
    ><ng-template swiperSlide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
      </div> </ng-template
    ><ng-template swiperSlide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
      </div> </ng-template
    ><ng-template swiperSlide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
      </div> </ng-template
    ><ng-template swiperSlide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
      </div>
    </ng-template>
  </swiper>`,
  styleUrls: ["./app.components.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
