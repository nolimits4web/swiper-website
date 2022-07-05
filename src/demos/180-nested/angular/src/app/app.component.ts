import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: "app-swiper-example",
  template: ` <swiper
    class="mySwiper swiper-h"
    [spaceBetween]="50"
    [pagination]="{
      clickable: true
    }"
  >
    <ng-template swiperSlide>Horizontal Slide 1</ng-template>
    <ng-template swiperSlide>
      <swiper
        class="mySwiper2 swiper-v"
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
  styleUrls: ["./app.components.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
