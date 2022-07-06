import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: "app-swiper-example",
  template: `
    <swiper
      #swiperRef
      [slidesPerView]="3"
      [centeredSlides]="true"
      [spaceBetween]="30"
      [pagination]="{
        type: 'fraction'
      }"
      [navigation]="true"
      class="mySwiper"
    >
      <ng-template swiperSlide>Slide 1</ng-template>
      <ng-template swiperSlide>Slide 2</ng-template>
      <ng-template swiperSlide>Slide 3</ng-template>
      <ng-template swiperSlide>Slide 4</ng-template>
    </swiper>

    <p class="append-buttons">
      <button (click)="prepend2()" class="prepend-2-slides">
        Prepend 2 Slides
      </button>
      <button (click)="prepend()" class="prepend-slide">Prepend Slide</button>
      <button (click)="append()" class="append-slide">Append Slide</button>
      <button (click)="append2()" class="append-2-slides">
        Append 2 Slides
      </button>
    </p>
  `,
  styleUrls: ["./app.components.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  @ViewChild("swiperRef", { static: false }) sliderRef?: SwiperComponent;

  appendNumber = 4;
  prependNumber = 1;

  prepend() {
    this.sliderRef.swiperRef.prependSlide(
      '<div class="swiper-slide">Slide ' + --this.prependNumber + "</div>"
    );
  }

  prepend2() {
    this.sliderRef.swiperRef.prependSlide([
      '<div class="swiper-slide">Slide ' + --this.prependNumber + "</div>",
      '<div class="swiper-slide">Slide ' + --this.prependNumber + "</div>",
    ]);
  }

  append() {
    this.sliderRef.swiperRef.appendSlide(
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>"
    );
  }

  append2() {
    this.sliderRef.swiperRef.appendSlide([
      '<div class="swiper-slide">Slide ' + ++this.appendNumber + "</div>",
      '<div class="swiper-slide">Slide ' + ++this.appendNumber + "</div>",
    ]);
  }
}
