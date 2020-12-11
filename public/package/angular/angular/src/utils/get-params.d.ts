import { SwiperOptions } from 'swiper/types';
export declare const allowedParams: string[];
export declare function getParams(obj?: {}): {
    params: SwiperOptions;
    passedParams: {};
    rest: {};
};
