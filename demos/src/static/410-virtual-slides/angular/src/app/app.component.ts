import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Virtual } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Virtual]);

@Component({
  selector: 'app-swiper-example',
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
      [virtual]="true"
      class="mySwiper"
    >
      <ng-template swiperSlide *ngFor="let slide of slides">
        <div>Slide</div>
      </ng-template>
    </swiper>

    <p class="append-buttons">
      <button (click)="prepend()" class="prepend-2-slides">
        Prepend 2 Slides
      </button>
      <button (click)="slideTo(1)" class="slide-1">Slide 1</button>
      <button (click)="slideTo(250)" class="slide-250">Slide 250</button>
      <button (click)="slideTo(500)" class="slide-500">Slide 500</button>
      <button (click)="append()" class="append-slide">Append Slide</button>
    </p>
  `,
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  slides = Array.from({ length: 1000 }).map((_, index) => `Slide ${index + 1}`);
  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;

  appendNumber = 600;
  prependNumber = 1;

  prepend() {
    this.swiperRef.swiperRef.virtual.prependSlide([
      'Slide ' + --this.prependNumber,
      'Slide ' + --this.prependNumber,
    ]);
  }

  append() {
    this.swiperRef.swiperRef.virtual.appendSlide(
      'Slide ' + ++this.appendNumber
    );
  }

  slideTo(index: number) {
    this.swiperRef.swiperRef.slideTo(index - 1, 0);
  }
}
