import { Component, ViewEncapsulation } from "@angular/core";

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: "app-swiper-example",
  template: `<swiper [pagination]="'pagination'">
    <ng-template swiperSlide>Slide 1</ng-template>
    <ng-template swiperSlide>Slide 2</ng-template>
    <ng-template swiperSlide>Slide 3</ng-template>
    <ng-template swiperSlide>Slide 4</ng-template>
    <ng-template swiperSlide>Slide 5</ng-template>
    <ng-template swiperSlide>Slide 6</ng-template>
    <ng-template swiperSlide>Slide 7</ng-template>
    <ng-template swiperSlide>Slide 8</ng-template>
    <ng-template swiperSlide>Slide 9</ng-template>
    <ng-template swiperSlide>Slide 10</ng-template>
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

      .swiper-pagination-bullet {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        color: #000;
        opacity: 1;
        background: rgba(0, 0, 0, 0.2);
      }

      .swiper-pagination-bullet-active {
        color: #fff;
        background: #007aff;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
}
