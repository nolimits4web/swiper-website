import { Component, ViewEncapsulation } from "@angular/core";

// import Swiper core and required modules
import SwiperCore, { Parallax, Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Parallax, Pagination, Navigation]);

@Component({
  selector: "app-swiper-example",
  template: `<swiper
    style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff"
    [speed]="600"
    [parallax]="true"
    [pagination]="{
      clickable: true
    }"
    [navigation]="true"
  >
    <div
      slot="container-start"
      class="parallax-bg"
      style="background-image:url(https://swiperjs.com/demos/images/nature-1.jpg)"
      data-swiper-parallax="-23%"
    ></div>
    <ng-template swiperSlide>
      <div class="title" data-swiper-parallax="-300">Slide 1</div>
      <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
      <div class="text" data-swiper-parallax="-100">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
          laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
          Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
          Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper
          velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut
          libero. Aenean feugiat non eros quis feugiat.
        </p>
      </div> </ng-template
    ><ng-template swiperSlide>
      <div class="title" data-swiper-parallax="-300">Slide 2</div>
      <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
      <div class="text" data-swiper-parallax="-100">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
          laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
          Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
          Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper
          velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut
          libero. Aenean feugiat non eros quis feugiat.
        </p>
      </div> </ng-template
    ><ng-template swiperSlide>
      <div class="title" data-swiper-parallax="-300">Slide 3</div>
      <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
      <div class="text" data-swiper-parallax="-100">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
          laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
          Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
          Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper
          velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut
          libero. Aenean feugiat non eros quis feugiat.
        </p>
      </div>
    </ng-template>
  </swiper>`,
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
        width: 100%;
        height: 100%;
        background: #000;
      }

      .swiper-slide {
        font-size: 18px;
        color: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 40px 60px;
      }

      .parallax-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 130%;
        height: 100%;
        -webkit-background-size: cover;
        background-size: cover;
        background-position: center;
      }

      .swiper-slide .title {
        font-size: 41px;
        font-weight: 300;
      }

      .swiper-slide .subtitle {
        font-size: 21px;
      }

      .swiper-slide .text {
        font-size: 14px;
        max-width: 400px;
        line-height: 1.3;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
