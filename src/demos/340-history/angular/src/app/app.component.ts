import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, History } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, History]);

@Component({
  selector: "app-swiper-example",
  template: `<swiper
    [spaceBetween]="50"
    [slidesPerView]="1"
    [navigation]="true"
    [pagination]="true"
    [history]="{
      key: 'slide'
    }"
    class="mySwiper"
  >
    <ng-template data-history="1" swiperSlide>Slide 1</ng-template
    ><ng-template data-history="Slide 2" swiperSlide>Slide 2</ng-template
    ><ng-template data-history="3" swiperSlide>Slide 3</ng-template
    ><ng-template data-history="Slide 4" swiperSlide>Slide 4</ng-template
    ><ng-template data-history="5" swiperSlide>Slide 5</ng-template
    ><ng-template data-history="Slide 6" swiperSlide>Slide 6</ng-template
    ><ng-template data-history="7" swiperSlide>Slide 7</ng-template
    ><ng-template data-history="Slide 8" swiperSlide>Slide 8</ng-template
    ><ng-template data-history="9" swiperSlide>Slide 9</ng-template>
  </swiper>`,
  styleUrls: ["./app.components.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
