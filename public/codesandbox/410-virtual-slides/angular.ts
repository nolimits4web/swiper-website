import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper/core";

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
        clickable: true
      }"
      [navigation]="true"
    ></swiper>

    <p class="append-buttons">
      false

      <a href="#" (click)="prepend()" class="prepend-2-slides"
        >Prepend 2 Slides</a
      >
      <a href="#" (click)="prepend()" class="prepend-slide">Prepend Slide</a>
      <a href="#" (click)="append()" class="append-slide">Append Slide</a>
      <a href="#" (click)="append()" class="append-2-slides">Append 2 Slides</a>
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
        width: 800px;
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
  @ViewChild("sliderRef", { static: false }) sliderRef?: SwiperComponent;

  appendNumber = 600;
  prependNumber = 1;

  prepend() {
    this.sliderRef.swiperRef.virtual.prependSlide(
      "Slide " + --this.prependNumber
    );
  }

  prepend2() {
    this.sliderRef.swiperRef.virtual.prependSlide([
      "Slide " + --this.prependNumber,
      "Slide " + --this.prependNumber,
    ]);
  }

  append() {
    this.sliderRef.swiperRef.virtual.appendSlide(
      "Slide " + ++this.appendNumber
    );
  }

  append2() {
    this.sliderRef.swiperRef.virtual.appendSlide([
      "Slide " + ++this.prependNumber,
      "Slide " + ++this.prependNumber,
    ]);
  }
}
