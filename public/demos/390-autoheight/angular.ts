import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: "app-swiper-example",
  template: `<swiper
    [autoHeight]="true"
    [spaceBetween]="20"
    [navigation]="true"
    [pagination]="{
      clickable: true
    }"
  >
    <ng-template swiperSlide>Slide 1</ng-template
    ><ng-template swiperSlide>Slide 2</ng-template
    ><ng-template swiperSlide>Slide 3</ng-template
    ><ng-template swiperSlide>Slide 4</ng-template
    ><ng-template swiperSlide>Slide 5</ng-template
    ><ng-template swiperSlide>Slide 6</ng-template
    ><ng-template swiperSlide>Slide 7</ng-template
    ><ng-template swiperSlide>Slide 8</ng-template
    ><ng-template swiperSlide>Slide 9</ng-template>
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

      .swiper-container {
        width: 100%;
        height: auto;
      }

      .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
      }

      .swiper-container .swiper-slide {
        height: 300px;
        line-height: 300px;
      }

      .swiper-container .swiper-slide:nth-child(2n) {
        height: 500px;
        line-height: 500px;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
