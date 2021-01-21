import { TemplateRef } from '@angular/core';
export declare class SwiperSlideDirective {
    template: TemplateRef<any>;
    virtualIndex: number;
    set zoom(val: boolean);
    get zoom(): boolean;
    private _zoom;
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
