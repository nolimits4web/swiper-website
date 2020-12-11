import { Directive, Input, TemplateRef } from '@angular/core';
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
                selector: '[swiperSlide]',
            },] }
];
SwiperSlideDirective.ctorParameters = () => [
    { type: TemplateRef }
];
SwiperSlideDirective.propDecorators = {
    virtualIndex: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGVyLXNsaWRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvIiwic291cmNlcyI6WyJhbmd1bGFyL3NyYy9zd2lwZXItc2xpZGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFZLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUl4RSxNQUFNLE9BQU8sb0JBQW9CO0lBZ0MvQixZQUFtQixRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQVQ3QyxjQUFTLEdBQUc7WUFDVixRQUFRLEVBQUUsS0FBSztZQUNmLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsS0FBSztZQUNoQixXQUFXLEVBQUUsS0FBSztTQUNuQixDQUFDO0lBRzhDLENBQUM7SUE3QmpELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxVQUFVLENBQUMsR0FBRztRQUNoQixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssR0FBRyxFQUFFO1lBQzVCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLCtCQUErQixDQUFDLENBQUM7WUFDbEYsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ25ELFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN2RCxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLDZCQUE2QixDQUFDLENBQUM7WUFDNUUsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO1NBQzdFLENBQUM7SUFDSixDQUFDO0lBRU8sU0FBUyxDQUFDLFVBQW9CO1FBQ3BDLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbEYsQ0FBQzs7O1lBekJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTthQUMxQjs7O1lBSG9DLFdBQVc7OzsyQkFLN0MsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9wdGlvbmFsLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3N3aXBlclNsaWRlXScsXG59KVxuZXhwb3J0IGNsYXNzIFN3aXBlclNsaWRlRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgdmlydHVhbEluZGV4OiBudW1iZXI7XG4gIHNsaWRlSW5kZXg6IG51bWJlcjtcbiAgZ2V0IGNsYXNzTmFtZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NsYXNzTmFtZXM7XG4gIH1cbiAgc2V0IGNsYXNzTmFtZXModmFsKSB7XG4gICAgaWYgKHRoaXMuX2NsYXNzTmFtZXMgPT09IHZhbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jbGFzc05hbWVzID0gdmFsO1xuICAgIHRoaXMuc2xpZGVEYXRhID0ge1xuICAgICAgaXNBY3RpdmU6IHRoaXMuX2hhc0NsYXNzKFsnc3dpcGVyLXNsaWRlLWFjdGl2ZScsICdzd2lwZXItc2xpZGUtZHVwbGljYXRlLWFjdGl2ZSddKSxcbiAgICAgIGlzVmlzaWJsZTogdGhpcy5faGFzQ2xhc3MoWydzd2lwZXItc2xpZGUtdmlzaWJsZSddKSxcbiAgICAgIGlzRHVwbGljYXRlOiB0aGlzLl9oYXNDbGFzcyhbJ3N3aXBlci1zbGlkZS1kdXBsaWNhdGUnXSksXG4gICAgICBpc1ByZXY6IHRoaXMuX2hhc0NsYXNzKFsnc3dpcGVyLXNsaWRlLXByZXYnLCAnc3dpcGVyLXNsaWRlLWR1cGxpY2F0ZS1wcmV2J10pLFxuICAgICAgaXNOZXh0OiB0aGlzLl9oYXNDbGFzcyhbJ3N3aXBlci1zbGlkZS1uZXh0JywgJ3N3aXBlci1zbGlkZS1kdXBsaWNhdGUtbmV4dCddKSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFzQ2xhc3MoY2xhc3NOYW1lczogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gY2xhc3NOYW1lcy5zb21lKChjbGFzc05hbWUpID0+IHRoaXMuX2NsYXNzTmFtZXMuaW5kZXhPZihjbGFzc05hbWUpID49IDApO1xuICB9XG4gIHNsaWRlRGF0YSA9IHtcbiAgICBpc0FjdGl2ZTogZmFsc2UsXG4gICAgaXNQcmV2OiBmYWxzZSxcbiAgICBpc05leHQ6IGZhbHNlLFxuICAgIGlzVmlzaWJsZTogZmFsc2UsXG4gICAgaXNEdXBsaWNhdGU6IGZhbHNlLFxuICB9O1xuXG4gIHByaXZhdGUgX2NsYXNzTmFtZXM6IHN0cmluZztcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuIl19