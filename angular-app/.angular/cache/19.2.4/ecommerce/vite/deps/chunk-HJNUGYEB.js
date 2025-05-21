import {
  CommonModule,
  NgClass
} from "./chunk-AXP32RGN.js";
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  setClassMetadata,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceSVG,
  ɵɵproperty,
  ɵɵpureFunction1
} from "./chunk-EDUAMG3U.js";

// node_modules/@ngx-templates/shared/fesm2022/ngx-templates-shared-icon.mjs
var _c0 = (a0) => [a0];
var IconComponent = class _IconComponent {
  constructor() {
    this.name = input.required();
    this.size = input("md");
  }
  static {
    this.ɵfac = function IconComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _IconComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _IconComponent,
      selectors: [["ngx-icon"]],
      hostAttrs: [1, "ngx-icon"],
      inputs: {
        name: [1, "name"],
        size: [1, "size"]
      },
      decls: 2,
      vars: 4,
      consts: [[1, "svg", 3, "ngClass"]],
      template: function IconComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵnamespaceSVG();
          ɵɵelementStart(0, "svg", 0);
          ɵɵelement(1, "use");
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵproperty("ngClass", ɵɵpureFunction1(2, _c0, ctx.size()));
          ɵɵadvance();
          ɵɵattribute("href", "/assets/icons-sprite.svg#" + ctx.name(), null, "xlink");
        }
      },
      dependencies: [CommonModule, NgClass],
      styles: [".ngx-icon{position:relative;display:block}.ngx-icon .svg{position:absolute;top:0;left:0;all:inherit;margin:initial;transform:initial;position:initial;top:initial;left:initial;right:initial;bottom:initial;border:initial;width:1.125rem;height:1.125rem;fill:var(--icon-color, currentColor);stroke:var(--icon-color, currentColor)}.ngx-icon .svg.sm{width:.875rem;height:.875rem}.ngx-icon .svg.md{width:1.125rem;height:1.125rem}.ngx-icon .svg.lg{width:1.25rem;height:1.25rem}.ngx-icon .svg.xlg{width:1.5rem;height:1.5rem}.ngx-icon .svg.xxlg{width:2rem;height:2rem}\n"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconComponent, [{
    type: Component,
    args: [{
      selector: "ngx-icon",
      imports: [CommonModule],
      template: `
    <svg class="svg" [ngClass]="[size()]">
      <use [attr.xlink:href]="'/assets/icons-sprite.svg#' + name()"></use>
    </svg>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "ngx-icon"
      },
      styles: [".ngx-icon{position:relative;display:block}.ngx-icon .svg{position:absolute;top:0;left:0;all:inherit;margin:initial;transform:initial;position:initial;top:initial;left:initial;right:initial;bottom:initial;border:initial;width:1.125rem;height:1.125rem;fill:var(--icon-color, currentColor);stroke:var(--icon-color, currentColor)}.ngx-icon .svg.sm{width:.875rem;height:.875rem}.ngx-icon .svg.md{width:1.125rem;height:1.125rem}.ngx-icon .svg.lg{width:1.25rem;height:1.25rem}.ngx-icon .svg.xlg{width:1.5rem;height:1.5rem}.ngx-icon .svg.xxlg{width:2rem;height:2rem}\n"]
    }]
  }], null, null);
})();

export {
  IconComponent
};
//# sourceMappingURL=chunk-HJNUGYEB.js.map
