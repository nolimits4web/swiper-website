import { Component, ViewEncapsulation } from "@angular/core";

// import Swiper core and required modules
import SwiperCore, { Lazy, Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Lazy, Pagination, Navigation]);

@Component({
  selector: "app-swiper-example",
  template: `<swiper
    style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff"
    [lazy]="true"
    [pagination]="{
      clickable: true
    }"
    [navigation]="true"
  >
    <ng-template swiperSlide>
      <!-- Required swiper-lazy class and image source specified in data-src attribute -->
      <img
        data-src="https://swiperjs.com/demos/images/nature-1.jpg"
        class="swiper-lazy"
      />
      <!-- Preloader image -->
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </ng-template
    ><ng-template swiperSlide>
      <!-- Required swiper-lazy class and image source specified in data-src attribute -->
      <img
        data-src="https://swiperjs.com/demos/images/nature-2.jpg"
        class="swiper-lazy"
      />
      <!-- Preloader image -->
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </ng-template
    ><ng-template swiperSlide>
      <!-- Required swiper-lazy class and image source specified in data-src attribute -->
      <img
        data-src="https://swiperjs.com/demos/images/nature-3.jpg"
        class="swiper-lazy"
      />
      <!-- Preloader image -->
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </ng-template
    ><ng-template swiperSlide>
      <!-- Required swiper-lazy class and image source specified in data-src attribute -->
      <img
        data-src="https://swiperjs.com/demos/images/nature-4.jpg"
        class="swiper-lazy"
      />
      <!-- Preloader image -->
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </ng-template
    ><ng-template swiperSlide>
      <!-- Required swiper-lazy class and image source specified in data-src attribute -->
      <img
        data-src="https://swiperjs.com/demos/images/nature-5.jpg"
        class="swiper-lazy"
      />
      <!-- Preloader image -->
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </ng-template
    ><ng-template swiperSlide>
      <!-- Required swiper-lazy class and image source specified in data-src attribute -->
      <img
        data-src="https://swiperjs.com/demos/images/nature-6.jpg"
        class="swiper-lazy"
      />
      <!-- Preloader image -->
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </ng-template
    ><ng-template swiperSlide>
      <!-- Required swiper-lazy class and image source specified in data-src attribute -->
      <img
        data-src="https://swiperjs.com/demos/images/nature-7.jpg"
        class="swiper-lazy"
      />
      <!-- Preloader image -->
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </ng-template
    ><ng-template swiperSlide>
      <!-- Required swiper-lazy class and image source specified in data-src attribute -->
      <img
        data-src="https://swiperjs.com/demos/images/nature-8.jpg"
        class="swiper-lazy"
      />
      <!-- Preloader image -->
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </ng-template
    ><ng-template swiperSlide>
      <!-- Required swiper-lazy class and image source specified in data-src attribute -->
      <img
        data-src="https://swiperjs.com/demos/images/nature-9.jpg"
        class="swiper-lazy"
      />
      <!-- Preloader image -->
      <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
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

      .swiper-container {
        width: 100%;
        height: 100%;
      }

      .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #000;
      }

      .swiper-slide img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        -ms-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        position: absolute;
        left: 50%;
        top: 50%;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
