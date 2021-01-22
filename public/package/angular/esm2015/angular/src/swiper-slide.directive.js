import { Directive, Input, TemplateRef } from '@angular/core';
import { coerceBooleanProperty } from './utils/utils';
export class SwiperSlideDirective {
    constructor(template) {
        this.template = template;
        this.slideData = {
            isActive: false,
            isPrev: false,
            isNext: false,
            isVisible: false,
            isDuplicate: false,
        };
    }
    set zoom(val) {
        this._zoom = coerceBooleanProperty(val);
    }
    get zoom() {
        return this._zoom;
    }
    get classNames() {
        return this._classNames;
    }
    set classNames(val) {
        if (this._classNames === val) {
            return;
        }
        this._classNames = val;
        this.slideData = {
            isActive: this._hasClass(['swiper-slide-active', 'swiper-slide-duplicate-active']),
            isVisible: this._hasClass(['swiper-slide-visible']),
            isDuplicate: this._hasClass(['swiper-slide-duplicate']),
            isPrev: this._hasClass(['swiper-slide-prev', 'swiper-slide-duplicate-prev']),
            isNext: this._hasClass(['swiper-slide-next', 'swiper-slide-duplicate-next']),
        };
    }
    _hasClass(classNames) {
        return classNames.some((className) => this._classNames.indexOf(className) >= 0);
    }
}
SwiperSlideDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ng-template[swiperSlide]',
            },] }
];
SwiperSlideDirective.ctorParameters = () => [
    { type: TemplateRef }
];
SwiperSlideDirective.propDecorators = {
    virtualIndex: [{ type: Input }],
    zoom: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGVyLXNsaWRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hbmd1bGFyL3NyYy9zd2lwZXItc2xpZGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJdEQsTUFBTSxPQUFPLG9CQUFvQjtJQXdDL0IsWUFBbUIsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFUN0MsY0FBUyxHQUFHO1lBQ1YsUUFBUSxFQUFFLEtBQUs7WUFDZixNQUFNLEVBQUUsS0FBSztZQUNiLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLEtBQUs7WUFDaEIsV0FBVyxFQUFFLEtBQUs7U0FDbkIsQ0FBQztJQUc4QyxDQUFDO0lBdENqRCxJQUNJLElBQUksQ0FBQyxHQUFZO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBR0QsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFDRCxJQUFJLFVBQVUsQ0FBQyxHQUFHO1FBQ2hCLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxHQUFHLEVBQUU7WUFDNUIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMscUJBQXFCLEVBQUUsK0JBQStCLENBQUMsQ0FBQztZQUNsRixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDbkQsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztZQUM1RSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLDZCQUE2QixDQUFDLENBQUM7U0FDN0UsQ0FBQztJQUNKLENBQUM7SUFFTyxTQUFTLENBQUMsVUFBb0I7UUFDcEMsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDOzs7WUFqQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7YUFDckM7OztZQUowQixXQUFXOzs7MkJBTW5DLEtBQUs7bUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICcuL3V0aWxzL3V0aWxzJztcbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW3N3aXBlclNsaWRlXScsXG59KVxuZXhwb3J0IGNsYXNzIFN3aXBlclNsaWRlRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgdmlydHVhbEluZGV4OiBudW1iZXI7XG4gIEBJbnB1dCgpXG4gIHNldCB6b29tKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX3pvb20gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTtcbiAgfVxuICBnZXQgem9vbSgpIHtcbiAgICByZXR1cm4gdGhpcy5fem9vbTtcbiAgfVxuICBwcml2YXRlIF96b29tOiBib29sZWFuO1xuICBzbGlkZUluZGV4OiBudW1iZXI7XG4gIGdldCBjbGFzc05hbWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9jbGFzc05hbWVzO1xuICB9XG4gIHNldCBjbGFzc05hbWVzKHZhbCkge1xuICAgIGlmICh0aGlzLl9jbGFzc05hbWVzID09PSB2YWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY2xhc3NOYW1lcyA9IHZhbDtcbiAgICB0aGlzLnNsaWRlRGF0YSA9IHtcbiAgICAgIGlzQWN0aXZlOiB0aGlzLl9oYXNDbGFzcyhbJ3N3aXBlci1zbGlkZS1hY3RpdmUnLCAnc3dpcGVyLXNsaWRlLWR1cGxpY2F0ZS1hY3RpdmUnXSksXG4gICAgICBpc1Zpc2libGU6IHRoaXMuX2hhc0NsYXNzKFsnc3dpcGVyLXNsaWRlLXZpc2libGUnXSksXG4gICAgICBpc0R1cGxpY2F0ZTogdGhpcy5faGFzQ2xhc3MoWydzd2lwZXItc2xpZGUtZHVwbGljYXRlJ10pLFxuICAgICAgaXNQcmV2OiB0aGlzLl9oYXNDbGFzcyhbJ3N3aXBlci1zbGlkZS1wcmV2JywgJ3N3aXBlci1zbGlkZS1kdXBsaWNhdGUtcHJldiddKSxcbiAgICAgIGlzTmV4dDogdGhpcy5faGFzQ2xhc3MoWydzd2lwZXItc2xpZGUtbmV4dCcsICdzd2lwZXItc2xpZGUtZHVwbGljYXRlLW5leHQnXSksXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhc0NsYXNzKGNsYXNzTmFtZXM6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIGNsYXNzTmFtZXMuc29tZSgoY2xhc3NOYW1lKSA9PiB0aGlzLl9jbGFzc05hbWVzLmluZGV4T2YoY2xhc3NOYW1lKSA+PSAwKTtcbiAgfVxuICBzbGlkZURhdGEgPSB7XG4gICAgaXNBY3RpdmU6IGZhbHNlLFxuICAgIGlzUHJldjogZmFsc2UsXG4gICAgaXNOZXh0OiBmYWxzZSxcbiAgICBpc1Zpc2libGU6IGZhbHNlLFxuICAgIGlzRHVwbGljYXRlOiBmYWxzZSxcbiAgfTtcblxuICBwcml2YXRlIF9jbGFzc05hbWVzOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cbiJdfQ==