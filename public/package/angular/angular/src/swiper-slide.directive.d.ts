import { TemplateRef } from '@angular/core';
export declare class SwiperSlideDirective {
    template: TemplateRef<any>;
    virtualIndex: number;
    slideIndex: number;
    get classNames(): string;
    set classNames(val: string);
    private _hasClass;
    slideData: {
        isActive: boolean;
        isPrev: boolean;
        isNext: boolean;
        isVisible: boolean;
        isDuplicate: boolean;
    };
    private _classNames;
    constructor(template: TemplateRef<any>);
}
