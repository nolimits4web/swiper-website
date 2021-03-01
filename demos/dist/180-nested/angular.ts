import { Component, ViewEncapsulation } from "@angular/core";

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: "app-swiper-example",
  template: ` <swiper
    class="swiper-container-h"
    [spaceBetween]="50"
    [pagination]="{
      clickable: true
    }"
  >
    <ng-template swiperSlide>Horizontal Slide 1</ng-template>
    <ng-template swiperSlide>
      <swiper
        class="swiper-container-v"
        [direction]="'vertical'"
        [spaceBetween]="50"
        [pagination]="{
          clickable: true
        }"
      >
        <ng-template swiperSlide>Vertical Slide 1</ng-template>
        <ng-template swiperSlide>Vertical Slide 2</ng-template>
        <ng-template swiperSlide>Vertical Slide 3</ng-template>
        <ng-template swiperSlide>Vertical Slide 4</ng-template>
        <ng-template swiperSlide>Vertical Slide 5</ng-template>
      </swiper>
    </ng-template>
    <ng-template swiperSlide>Horizontal Slide 3</ng-template>
    <ng-template swiperSlide>Horizontal Slide 4</ng-template>
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

      .swiper-container-v {
        background: #eee;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
