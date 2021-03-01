import { Component, ViewEncapsulation } from "@angular/core";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: "app-swiper-example",
  template: `<swiper
    [spaceBetween]="30"
    [hashNavigation]="{
      watchState: true
    }"
    [pagination]="{
      clickable: true
    }"
    [navigation]="true"
  >
    <ng-template data-hash="slide1" swiperSlide>Slide 1</ng-template
    ><ng-template data-hash="slide2" swiperSlide>Slide 2</ng-template
    ><ng-template data-hash="slide3" swiperSlide>Slide 3</ng-template
    ><ng-template data-hash="slide4" swiperSlide>Slide 4</ng-template
    ><ng-template data-hash="slide5" swiperSlide>Slide 5</ng-template
    ><ng-template data-hash="slide6" swiperSlide>Slide 6</ng-template
    ><ng-template data-hash="slide7" swiperSlide>Slide 7</ng-template
    ><ng-template data-hash="slide8" swiperSlide>Slide 8</ng-template
    ><ng-template data-hash="slide9" swiperSlide>Slide 9</ng-template>
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
        height: 100%;
      }

      .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}