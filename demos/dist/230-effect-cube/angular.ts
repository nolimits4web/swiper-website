import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { EffectCube, Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([EffectCube, Pagination]);

@Component({
  selector: "app-swiper-example",
  template: `<swiper
    [effect]="'cube'"
    [grabCursor]="true"
    [cubeEffect]="{
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }"
    [pagination]="true"
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
        width: 300px;
        height: 300px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -150px;
        margin-top: -150px;
      }

      .swiper-slide {
        background-position: center;
        background-size: cover;
      }

      .swiper-slide img {
        display: block;
        width: 100%;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
