import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, {
  Keyboard,
  Scrollbar,
  Navigation,
  Pagination,
} from "swiper";

// install Swiper modules
SwiperCore.use([Keyboard, Scrollbar, Navigation, Pagination]);

@Component({
  selector: "app-swiper-example",
  template: `<swiper
    [slidesPerView]="1"
    [centeredSlides]="false"
    [slidesPerGroupSkip]="1"
    [grabCursor]="true"
    [keyboard]="{
      enabled: true
    }"
    [breakpoints]="{
      '769': {
        slidesPerView: 2,
        slidesPerGroup: 2
      }
    }"
    [scrollbar]="true"
    [navigation]="true"
    [pagination]="{
      clickable: true
    }"
    class="mySwiper"
  >
    <ng-template swiperSlide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-001.jpg"
    /></ng-template>
    <ng-template swiperSlide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-002.jpg"
    /></ng-template>
    <ng-template swiperSlide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-003.jpg"
    /></ng-template>
    <ng-template swiperSlide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-004.jpg"
    /></ng-template>
    <ng-template swiperSlide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-005.jpg"
    /></ng-template>
    <ng-template swiperSlide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-006.jpg"
    /></ng-template>
    <ng-template swiperSlide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-007.jpg"
    /></ng-template>
    <ng-template swiperSlide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-008.jpg"
    /></ng-template>
    <ng-template swiperSlide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-009.jpg"
    /></ng-template>
  </swiper>`,
  styleUrls: ["./app.components.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
