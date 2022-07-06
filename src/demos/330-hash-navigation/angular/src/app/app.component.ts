import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: "app-swiper-example",
  template: `<swiper
    [spaceBetween]="30"
    [hashNavigation]="{
      watchState: true
    }"
    [pagination]="{
      clickable: true
    }"
    [navigation]="true"
    class="mySwiper"
  >
    <ng-template data-hash="slide1" swiperSlide>Slide 1</ng-template
    ><ng-template data-hash="slide2" swiperSlide>Slide 2</ng-template
    ><ng-template data-hash="slide3" swiperSlide>Slide 3</ng-template
    ><ng-template data-hash="slide4" swiperSlide>Slide 4</ng-template
    ><ng-template data-hash="slide5" swiperSlide>Slide 5</ng-template
    ><ng-template data-hash="slide6" swiperSlide>Slide 6</ng-template
    ><ng-template data-hash="slide7" swiperSlide>Slide 7</ng-template
    ><ng-template data-hash="slide8" swiperSlide>Slide 8</ng-template
    ><ng-template data-hash="slide9" swiperSlide>Slide 9</ng-template>
  </swiper>`,
  styleUrls: ["./app.components.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
