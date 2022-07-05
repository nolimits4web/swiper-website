import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { EffectCube, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCube, Pagination]);

@Component({
  selector: "app-swiper-example",
  template: `<swiper
    [effect]="'cube'"
    [grabCursor]="true"
    [cubeEffect]="{
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }"
    [pagination]="true"
    class="mySwiper"
  >
    <ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></ng-template
    ><ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></ng-template
    ><ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></ng-template
    ><ng-template swiperSlide
      ><img src="https://swiperjs.com/demos/images/nature-4.jpg"
    /></ng-template>
  </swiper>`,
  styleUrls: ["./app.components.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
