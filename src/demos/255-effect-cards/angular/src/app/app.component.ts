import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { EffectCards } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCards]);

@Component({
  selector: "app-swiper-example",
  template: `
    <swiper [effect]="'cards'" [grabCursor]="true" class="mySwiper">
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
