import { Component, ViewEncapsulation } from "@angular/core";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Virtual } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Virtual]);

@Component({
  selector: "app-swiper-example",
  template: `
    <swiper
      [slidesPerView]="3"
      [centeredSlides]="true"
      [spaceBetween]="30"
      [pagination]="{
        type: 'fraction'
      }"
      [navigation]="true"
      [virtual]="'virtual'"
    ></swiper>

    <p class="append-buttons">
      <a href="#" class="prepend-2-slides">Prepend 2 Slides</a>
      <a href="#" class="slide-1">Slide 1</a>
      <a href="#" class="slide-250">Slide 250</a>
      <a href="#" class="slide-500">Slide 500</a>
      <a href="#" class="append-slide">Append Slide</a>
    </p>
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

      .swiper-container {
        width: 100%;
        height: 300px;
        margin: 20px auto;
      }
      .append-buttons {
        text-align: center;
        margin-top: 20px;
      }

      .append-buttons a {
        display: inline-block;
        border: 1px solid #007aff;
        color: #007aff;
        text-decoration: none;
        padding: 4px 10px;
        border-radius: 4px;
        margin: 0 10px;
        font-size: 13px;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  virtual = {
    slides: (function () {
      var slides = [];
      for (var i = 0; i < 600; i += 1) {
        slides.push("Slide " + (i + 1));
      }
      return slides;
    })(),
  };
}
