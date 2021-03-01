import { Component, ViewEncapsulation } from "@angular/core";

// import Swiper core and required modules
import SwiperCore, { Zoom, Navigation, Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([Zoom, Navigation, Pagination]);

@Component({
  selector: "app-swiper-example",
  template: `<swiper
    style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff"
    [zoom]="true"
    [navigation]="true"
    [pagination]="{
      clickable: true
    }"
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
  styles: [
    `
      html,
      body {
        position: relative;
        height: 100%;
      }

      body {
        background: #eee;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 14px;
        color: #000;
        margin: 0;
        padding: 0;
      }

      body {
        background: #000;
      }

      .swiper-container {
        width: 100%;
        height: 100%;
      }

      .swiper-slide {
        overflow: hidden;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
