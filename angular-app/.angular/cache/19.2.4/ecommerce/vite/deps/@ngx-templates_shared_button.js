import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  inject,
  input,
  setClassMetadata,
  ɵɵdefineComponent,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-EDUAMG3U.js";
import "./chunk-WDMUDEB6.js";

// node_modules/@ngx-templates/shared/fesm2022/ngx-templates-shared-button.mjs
var _c0 = ["ngx-button", ""];
var _c1 = ["*"];
var ButtonComponent = class _ButtonComponent {
  constructor() {
    this._renderer = inject(Renderer2);
    this._elRef = inject(ElementRef);
    this.btnType = input.required();
    this.size = input("compact");
  }
  ngOnInit() {
    const el = this._elRef.nativeElement;
    this._renderer.addClass(el, `${this.btnType()}-btn`);
    this._renderer.addClass(el, `${this.size()}-size-btn`);
  }
  static {
    this.ɵfac = function ButtonComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ButtonComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ButtonComponent,
      selectors: [["button", "ngx-button", ""]],
      hostAttrs: [1, "ngx-button"],
      inputs: {
        btnType: [1, "btnType"],
        size: [1, "size"]
      },
      attrs: _c0,
      ngContentSelectors: _c1,
      decls: 1,
      vars: 0,
      template: function ButtonComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{font-weight:500;border-radius:.25rem;border:none;transition:color .3s ease;font-size:.875rem;padding:.5rem;cursor:pointer}.minimal-size-btn[_nghost-%COMP%]{font-size:.75rem;padding:.25rem .75rem;border-radius:.2rem}@media (max-width: 640px){.minimal-size-btn[_nghost-%COMP%]{font-size:1rem}}.large-size-btn[_nghost-%COMP%]{padding:.75rem 1rem;font-size:1rem}.primary-btn[_nghost-%COMP%], .danger-btn[_nghost-%COMP%]{border:1px solid transparent;color:var(--color-bg);transition:background-color .3s ease,background-position .3s ease,opacity .3s ease}.primary-btn[_nghost-%COMP%]:not([disabled]):hover, .danger-btn[_nghost-%COMP%]:not([disabled]):hover{background-position-x:calc(100% + 1px)}.primary-btn[disabled][_nghost-%COMP%], .danger-btn[disabled][_nghost-%COMP%]{background:var(--color-quinary)}.primary-btn[_nghost-%COMP%]{background:var(--gradient-orange-to-violet);background-size:200%;background-position:50%}.secondary-btn[_nghost-%COMP%]{border:1px solid var(--color-senary);color:var(--color-tertiary);transition:border-color .3s ease,color .3s ease;background-color:var(--color-bg)}.secondary-btn[_nghost-%COMP%]:not([disabled]):hover{border-color:var(--color-french-violet)}.secondary-btn[disabled][_nghost-%COMP%]{color:var(--color-quinary)}.danger-btn[_nghost-%COMP%]{background:var(--gradient-red-to-darkred);background-size:200%;background-position:50%}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonComponent, [{
    type: Component,
    args: [{
      selector: "button[ngx-button]",
      imports: [],
      template: "<ng-content />",
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        class: "ngx-button"
      },
      styles: [":host{font-weight:500;border-radius:.25rem;border:none;transition:color .3s ease;font-size:.875rem;padding:.5rem;cursor:pointer}:host.minimal-size-btn{font-size:.75rem;padding:.25rem .75rem;border-radius:.2rem}@media (max-width: 640px){:host.minimal-size-btn{font-size:1rem}}:host.large-size-btn{padding:.75rem 1rem;font-size:1rem}:host.primary-btn,:host.danger-btn{border:1px solid transparent;color:var(--color-bg);transition:background-color .3s ease,background-position .3s ease,opacity .3s ease}:host.primary-btn:not([disabled]):hover,:host.danger-btn:not([disabled]):hover{background-position-x:calc(100% + 1px)}:host.primary-btn[disabled],:host.danger-btn[disabled]{background:var(--color-quinary)}:host.primary-btn{background:var(--gradient-orange-to-violet);background-size:200%;background-position:50%}:host.secondary-btn{border:1px solid var(--color-senary);color:var(--color-tertiary);transition:border-color .3s ease,color .3s ease;background-color:var(--color-bg)}:host.secondary-btn:not([disabled]):hover{border-color:var(--color-french-violet)}:host.secondary-btn[disabled]{color:var(--color-quinary)}:host.danger-btn{background:var(--gradient-red-to-darkred);background-size:200%;background-position:50%}\n"]
    }]
  }], null, null);
})();
export {
  ButtonComponent
};
//# sourceMappingURL=@ngx-templates_shared_button.js.map
