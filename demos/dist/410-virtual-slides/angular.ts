import { Component, ViewEncapsulation } from "@angular/core";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Virtual } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Virtual]);

@Component({
  selector: "app-swiper-example",
  template: `
    <swiper
      [slidesPerView]="3"
      [centeredSlides]="true"
      [spaceBetween]="30"
      [pagination]="{
        type: 'fraction'
      }"
      [navigation]="true"
      [virtual]="{
        slides:
          'Slide 1,Slide 2,Slide 3,Slide 4,Slide 5,Slide 6,Slide 7,Slide 8,Slide 9,Slide 10,Slide 11,Slide 12,Slide 13,Slide 14,Slide 15,Slide 16,Slide 17,Slide 18,Slide 19,Slide 20,Slide 21,Slide 22,Slide 23,Slide 24,Slide 25,Slide 26,Slide 27,Slide 28,Slide 29,Slide 30,Slide 31,Slide 32,Slide 33,Slide 34,Slide 35,Slide 36,Slide 37,Slide 38,Slide 39,Slide 40,Slide 41,Slide 42,Slide 43,Slide 44,Slide 45,Slide 46,Slide 47,Slide 48,Slide 49,Slide 50,Slide 51,Slide 52,Slide 53,Slide 54,Slide 55,Slide 56,Slide 57,Slide 58,Slide 59,Slide 60,Slide 61,Slide 62,Slide 63,Slide 64,Slide 65,Slide 66,Slide 67,Slide 68,Slide 69,Slide 70,Slide 71,Slide 72,Slide 73,Slide 74,Slide 75,Slide 76,Slide 77,Slide 78,Slide 79,Slide 80,Slide 81,Slide 82,Slide 83,Slide 84,Slide 85,Slide 86,Slide 87,Slide 88,Slide 89,Slide 90,Slide 91,Slide 92,Slide 93,Slide 94,Slide 95,Slide 96,Slide 97,Slide 98,Slide 99,Slide 100,Slide 101,Slide 102,Slide 103,Slide 104,Slide 105,Slide 106,Slide 107,Slide 108,Slide 109,Slide 110,Slide 111,Slide 112,Slide 113,Slide 114,Slide 115,Slide 116,Slide 117,Slide 118,Slide 119,Slide 120,Slide 121,Slide 122,Slide 123,Slide 124,Slide 125,Slide 126,Slide 127,Slide 128,Slide 129,Slide 130,Slide 131,Slide 132,Slide 133,Slide 134,Slide 135,Slide 136,Slide 137,Slide 138,Slide 139,Slide 140,Slide 141,Slide 142,Slide 143,Slide 144,Slide 145,Slide 146,Slide 147,Slide 148,Slide 149,Slide 150,Slide 151,Slide 152,Slide 153,Slide 154,Slide 155,Slide 156,Slide 157,Slide 158,Slide 159,Slide 160,Slide 161,Slide 162,Slide 163,Slide 164,Slide 165,Slide 166,Slide 167,Slide 168,Slide 169,Slide 170,Slide 171,Slide 172,Slide 173,Slide 174,Slide 175,Slide 176,Slide 177,Slide 178,Slide 179,Slide 180,Slide 181,Slide 182,Slide 183,Slide 184,Slide 185,Slide 186,Slide 187,Slide 188,Slide 189,Slide 190,Slide 191,Slide 192,Slide 193,Slide 194,Slide 195,Slide 196,Slide 197,Slide 198,Slide 199,Slide 200,Slide 201,Slide 202,Slide 203,Slide 204,Slide 205,Slide 206,Slide 207,Slide 208,Slide 209,Slide 210,Slide 211,Slide 212,Slide 213,Slide 214,Slide 215,Slide 216,Slide 217,Slide 218,Slide 219,Slide 220,Slide 221,Slide 222,Slide 223,Slide 224,Slide 225,Slide 226,Slide 227,Slide 228,Slide 229,Slide 230,Slide 231,Slide 232,Slide 233,Slide 234,Slide 235,Slide 236,Slide 237,Slide 238,Slide 239,Slide 240,Slide 241,Slide 242,Slide 243,Slide 244,Slide 245,Slide 246,Slide 247,Slide 248,Slide 249,Slide 250,Slide 251,Slide 252,Slide 253,Slide 254,Slide 255,Slide 256,Slide 257,Slide 258,Slide 259,Slide 260,Slide 261,Slide 262,Slide 263,Slide 264,Slide 265,Slide 266,Slide 267,Slide 268,Slide 269,Slide 270,Slide 271,Slide 272,Slide 273,Slide 274,Slide 275,Slide 276,Slide 277,Slide 278,Slide 279,Slide 280,Slide 281,Slide 282,Slide 283,Slide 284,Slide 285,Slide 286,Slide 287,Slide 288,Slide 289,Slide 290,Slide 291,Slide 292,Slide 293,Slide 294,Slide 295,Slide 296,Slide 297,Slide 298,Slide 299,Slide 300,Slide 301,Slide 302,Slide 303,Slide 304,Slide 305,Slide 306,Slide 307,Slide 308,Slide 309,Slide 310,Slide 311,Slide 312,Slide 313,Slide 314,Slide 315,Slide 316,Slide 317,Slide 318,Slide 319,Slide 320,Slide 321,Slide 322,Slide 323,Slide 324,Slide 325,Slide 326,Slide 327,Slide 328,Slide 329,Slide 330,Slide 331,Slide 332,Slide 333,Slide 334,Slide 335,Slide 336,Slide 337,Slide 338,Slide 339,Slide 340,Slide 341,Slide 342,Slide 343,Slide 344,Slide 345,Slide 346,Slide 347,Slide 348,Slide 349,Slide 350,Slide 351,Slide 352,Slide 353,Slide 354,Slide 355,Slide 356,Slide 357,Slide 358,Slide 359,Slide 360,Slide 361,Slide 362,Slide 363,Slide 364,Slide 365,Slide 366,Slide 367,Slide 368,Slide 369,Slide 370,Slide 371,Slide 372,Slide 373,Slide 374,Slide 375,Slide 376,Slide 377,Slide 378,Slide 379,Slide 380,Slide 381,Slide 382,Slide 383,Slide 384,Slide 385,Slide 386,Slide 387,Slide 388,Slide 389,Slide 390,Slide 391,Slide 392,Slide 393,Slide 394,Slide 395,Slide 396,Slide 397,Slide 398,Slide 399,Slide 400,Slide 401,Slide 402,Slide 403,Slide 404,Slide 405,Slide 406,Slide 407,Slide 408,Slide 409,Slide 410,Slide 411,Slide 412,Slide 413,Slide 414,Slide 415,Slide 416,Slide 417,Slide 418,Slide 419,Slide 420,Slide 421,Slide 422,Slide 423,Slide 424,Slide 425,Slide 426,Slide 427,Slide 428,Slide 429,Slide 430,Slide 431,Slide 432,Slide 433,Slide 434,Slide 435,Slide 436,Slide 437,Slide 438,Slide 439,Slide 440,Slide 441,Slide 442,Slide 443,Slide 444,Slide 445,Slide 446,Slide 447,Slide 448,Slide 449,Slide 450,Slide 451,Slide 452,Slide 453,Slide 454,Slide 455,Slide 456,Slide 457,Slide 458,Slide 459,Slide 460,Slide 461,Slide 462,Slide 463,Slide 464,Slide 465,Slide 466,Slide 467,Slide 468,Slide 469,Slide 470,Slide 471,Slide 472,Slide 473,Slide 474,Slide 475,Slide 476,Slide 477,Slide 478,Slide 479,Slide 480,Slide 481,Slide 482,Slide 483,Slide 484,Slide 485,Slide 486,Slide 487,Slide 488,Slide 489,Slide 490,Slide 491,Slide 492,Slide 493,Slide 494,Slide 495,Slide 496,Slide 497,Slide 498,Slide 499,Slide 500,Slide 501,Slide 502,Slide 503,Slide 504,Slide 505,Slide 506,Slide 507,Slide 508,Slide 509,Slide 510,Slide 511,Slide 512,Slide 513,Slide 514,Slide 515,Slide 516,Slide 517,Slide 518,Slide 519,Slide 520,Slide 521,Slide 522,Slide 523,Slide 524,Slide 525,Slide 526,Slide 527,Slide 528,Slide 529,Slide 530,Slide 531,Slide 532,Slide 533,Slide 534,Slide 535,Slide 536,Slide 537,Slide 538,Slide 539,Slide 540,Slide 541,Slide 542,Slide 543,Slide 544,Slide 545,Slide 546,Slide 547,Slide 548,Slide 549,Slide 550,Slide 551,Slide 552,Slide 553,Slide 554,Slide 555,Slide 556,Slide 557,Slide 558,Slide 559,Slide 560,Slide 561,Slide 562,Slide 563,Slide 564,Slide 565,Slide 566,Slide 567,Slide 568,Slide 569,Slide 570,Slide 571,Slide 572,Slide 573,Slide 574,Slide 575,Slide 576,Slide 577,Slide 578,Slide 579,Slide 580,Slide 581,Slide 582,Slide 583,Slide 584,Slide 585,Slide 586,Slide 587,Slide 588,Slide 589,Slide 590,Slide 591,Slide 592,Slide 593,Slide 594,Slide 595,Slide 596,Slide 597,Slide 598,Slide 599,Slide 600'
      }"
    ></swiper>

    <p class="append-buttons">
      <a href="#" class="prepend-2-slides">Prepend 2 Slides</a>
      <a href="#" class="slide-1">Slide 1</a>
      <a href="#" class="slide-250">Slide 250</a>
      <a href="#" class="slide-500">Slide 500</a>
      <a href="#" class="append-slide">Append Slide</a>
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
        width: 100%;
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
export class AppComponent {}
