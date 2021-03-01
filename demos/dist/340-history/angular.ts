import { Component, ViewEncapsulation } from "@angular/core";

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, History } from "swiper/core";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, History]);

@Component({
  selector: "app-swiper-example",
  template: `<swiper
    [spaceBetween]="50"
    [slidesPerView]="1"
    [navigation]="true"
    [pagination]="true"
    [history]="{
      key: 'slide'
    }"
  >
    <ng-template data-history="1" swiperSlide>Slide 1</ng-template
    ><ng-template data-history="Slide 2" swiperSlide>Slide 2</ng-template
    ><ng-template data-history="3" swiperSlide>Slide 3</ng-template
    ><ng-template data-history="Slide 4" swiperSlide>Slide 4</ng-template
    ><ng-template data-history="5" swiperSlide>Slide 5</ng-template
    ><ng-template data-history="Slide 6" swiperSlide>Slide 6</ng-template
    ><ng-template data-history="7" swiperSlide>Slide 7</ng-template
    ><ng-template data-history="Slide 8" swiperSlide>Slide 8</ng-template
    ><ng-template data-history="9" swiperSlide>Slide 9</ng-template>
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
