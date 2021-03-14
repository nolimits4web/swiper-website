import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

@Component({
  selector: "app-swiper-example",
  template: `
    <h3>
      Slider5 is visible when you slide to 2,3, or 4, and slider5 has
      "swiper-slide-visible" className
    </h3>
    <br />
    <swiper
      [watchSlidesProgress]="true"
      [watchSlidesVisibility]="true"
      [slidesPerView]="3"
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
    </swiper>
  `,
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

      .swiper-slide {
        height: 300px;
        background: #882525;
        line-height: 300px;
        text-align: center;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
