import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { EffectCreative } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCreative]);

@Component({
  selector: "app-swiper-example",
  template: `
    <swiper
      [grabCursor]="true"
      [effect]="'creative'"
      [creativeEffect]="{
        prev: {
          shadow: true,
          translate: [0, 0, -400]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      }"
      class="mySwiper"
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
    <swiper
      [grabCursor]="true"
      [effect]="'creative'"
      [creativeEffect]="{
        prev: {
          shadow: true,
          translate: ['-120%', 0, -500]
        },
        next: {
          shadow: true,
          translate: ['120%', 0, -500]
        }
      }"
      class="mySwiper2"
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
    <swiper
      [grabCursor]="true"
      [effect]="'creative'"
      [creativeEffect]="{
        prev: {
          shadow: true,
          translate: ['-20%', 0, -1]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      }"
      class="mySwiper3"
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
    <swiper
      [grabCursor]="true"
      [effect]="'creative'"
      [creativeEffect]="{
        prev: {
          shadow: true,
          translate: [0, 0, -800],
          rotate: [180, 0, 0]
        },
        next: {
          shadow: true,
          translate: [0, 0, -800],
          rotate: [-180, 0, 0]
        }
      }"
      class="mySwiper4"
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
    <swiper
      [grabCursor]="true"
      [effect]="'creative'"
      [creativeEffect]="{
        prev: {
          shadow: true,
          translate: ['-125%', 0, -800],
          rotate: [0, 0, -90]
        },
        next: {
          shadow: true,
          translate: ['125%', 0, -800],
          rotate: [0, 0, 90]
        }
      }"
      class="mySwiper5"
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
    <swiper
      [grabCursor]="true"
      [effect]="'creative'"
      [creativeEffect]="{
        prev: {
          shadow: true,
          origin: 'left center',
          translate: ['-5%', 0, -200],
          rotate: [0, 100, 0]
        },
        next: {
          origin: 'right center',
          translate: ['5%', 0, -200],
          rotate: [0, -100, 0]
        }
      }"
      class="mySwiper6"
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
  styleUrls: ["./app.components.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
