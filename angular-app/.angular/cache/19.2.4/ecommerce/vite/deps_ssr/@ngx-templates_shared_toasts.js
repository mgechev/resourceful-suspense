import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  List
} from "./chunk-FODD2KN3.js";
import {
  IconComponent
} from "./chunk-QMG2FP3X.js";
import {
  CommonModule,
  NgClass
} from "./chunk-EWETOJTL.js";
import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  computed,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-RMUIWRBI.js";
import {
  __spreadValues
} from "./chunk-YHCV7DAQ.js";

// node_modules/@ngx-templates/shared/fesm2022/ngx-templates-shared-toasts.mjs
function ToastComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "ngx-icon", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("name", ctx_r0.toast().config.icon);
  }
}
var _forTrack0 = ($index, $item) => $item.createdAt;
function ToastOutletComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "ngx-toast", 1);
  }
  if (rf & 2) {
    const toast_r1 = ctx.$implicit;
    ɵɵproperty("toast", toast_r1);
  }
}
function ToastOutletComponent_For_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "ngx-toast", 1);
  }
  if (rf & 2) {
    const toast_r2 = ctx.$implicit;
    ɵɵproperty("toast", toast_r2);
  }
}
var ToastType;
(function(ToastType2) {
  ToastType2["Default"] = "default";
  ToastType2["Notification"] = "notification";
})(ToastType || (ToastType = {}));
var TYPE_TO_CLASS = {
  default: "def-type",
  notification: "ntf-type"
};
var ToastComponent = class _ToastComponent {
  constructor() {
    this.toast = input.required();
    this.ToastType = ToastType;
    this.TYPE_TO_CLASS = TYPE_TO_CLASS;
  }
  static {
    this.ɵfac = function ToastComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToastComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ToastComponent,
      selectors: [["ngx-toast"]],
      inputs: {
        toast: [1, "toast"]
      },
      decls: 4,
      vars: 3,
      consts: [["title", "Close toast", 3, "click", "ngClass"], ["size", "lg", 3, "name"]],
      template: function ToastComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "button", 0);
          ɵɵlistener("click", function ToastComponent_Template_button_click_0_listener() {
            return ctx.toast().destroy();
          });
          ɵɵtemplate(1, ToastComponent_Conditional_1_Template, 1, 1, "ngx-icon", 1);
          ɵɵelementStart(2, "span");
          ɵɵtext(3);
          ɵɵelementEnd()();
        }
        if (rf & 2) {
          ɵɵproperty("ngClass", ctx.TYPE_TO_CLASS[ctx.toast().config.type]);
          ɵɵadvance();
          ɵɵconditional(ctx.toast().config.type === ctx.ToastType.Notification && ctx.toast().config.icon ? 1 : -1);
          ɵɵadvance(2);
          ɵɵtextInterpolate(ctx.toast().name);
        }
      },
      dependencies: [CommonModule, NgClass, IconComponent],
      styles: ["[_nghost-%COMP%]   button.ntf-type[_ngcontent-%COMP%]{font-size:.875rem;font-style:normal;line-height:1rem}@media (max-width: 640px){[_nghost-%COMP%]   button.ntf-type[_ngcontent-%COMP%]{font-size:1rem}}[_nghost-%COMP%]   button.def-type[_ngcontent-%COMP%]{font-size:.75rem}[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   button[_ngcontent-%COMP%]{display:block;border:none;margin-bottom:.5rem}[_nghost-%COMP%]   button.def-type[_ngcontent-%COMP%]{padding:.25rem .875rem;border-radius:.25rem;background:var(--gradient-pink-to-violet);box-shadow:0 2px 5px #0003;color:var(--white);animation:_ngcontent-%COMP%_slide-down .3s ease;animation-iteration-count:1;animation-fill-mode:forwards}[_nghost-%COMP%]   button.ntf-type[_ngcontent-%COMP%]{padding:.75rem 1rem;border-radius:.25rem;max-width:250px;text-align:left;color:var(--color-electric-lavander);background-color:var(--color-septenary);border:1px solid var(--color-french-violet);box-shadow:0 2px 2px #0000001a;animation:_ngcontent-%COMP%_slide-right .3s ease;animation-iteration-count:1;animation-fill-mode:forwards;display:flex;align-items:center;line-height:1.25rem}[_nghost-%COMP%]   button.ntf-type[_ngcontent-%COMP%]   ngx-icon[_ngcontent-%COMP%]{margin-right:.75rem}@keyframes _ngcontent-%COMP%_slide-down{0%{opacity:0;transform:translateY(0)}to{opacity:1;transform:translateY(4.5rem)}}@keyframes _ngcontent-%COMP%_slide-right{0%{opacity:0;transform:translate(0)}to{opacity:1;transform:translate(1.5rem)}}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastComponent, [{
    type: Component,
    args: [{
      selector: "ngx-toast",
      imports: [CommonModule, IconComponent],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: '<button\n  (click)="toast().destroy()"\n  title="Close toast"\n  [ngClass]="TYPE_TO_CLASS[toast().config.type]"\n>\n  @if (toast().config.type === ToastType.Notification && toast().config.icon) {\n    <ngx-icon [name]="toast().config.icon!" size="lg" />\n  }\n  <span>{{ toast().name }}</span>\n</button>\n',
      styles: [":host button.ntf-type{font-size:.875rem;font-style:normal;line-height:1rem}@media (max-width: 640px){:host button.ntf-type{font-size:1rem}}:host button.def-type{font-size:.75rem}:host{display:block}:host button{display:block;border:none;margin-bottom:.5rem}:host button.def-type{padding:.25rem .875rem;border-radius:.25rem;background:var(--gradient-pink-to-violet);box-shadow:0 2px 5px #0003;color:var(--white);animation:slide-down .3s ease;animation-iteration-count:1;animation-fill-mode:forwards}:host button.ntf-type{padding:.75rem 1rem;border-radius:.25rem;max-width:250px;text-align:left;color:var(--color-electric-lavander);background-color:var(--color-septenary);border:1px solid var(--color-french-violet);box-shadow:0 2px 2px #0000001a;animation:slide-right .3s ease;animation-iteration-count:1;animation-fill-mode:forwards;display:flex;align-items:center;line-height:1.25rem}:host button.ntf-type ngx-icon{margin-right:.75rem}@keyframes slide-down{0%{opacity:0;transform:translateY(0)}to{opacity:1;transform:translateY(4.5rem)}}@keyframes slide-right{0%{opacity:0;transform:translate(0)}to{opacity:1;transform:translate(1.5rem)}}\n"]
    }]
  }], null, null);
})();
var DEFAULT_CFG = {
  ttl: 1e3,
  type: ToastType.Default
};
var Toast = class {
  constructor(name, _list, config) {
    this.name = name;
    this._list = _list;
    this.createdAt = (/* @__PURE__ */ new Date()).getTime();
    this.destroyPromise = new Promise((res) => {
      this._destroyResolver = res;
    });
    this.config = __spreadValues(__spreadValues({}, DEFAULT_CFG), config);
    this._destroyTimeout = setTimeout(() => this.destroy(), this.config.ttl);
  }
  /**
   * Remove the toast from the list (i.e. the DOM)
   */
  destroy() {
    if (this._destroyTimeout) {
      clearTimeout(this._destroyTimeout);
    }
    const list = this._list();
    const idx = list.findIndex((t) => t === this);
    this._list.update((l) => l.remove(idx));
    this._destroyResolver();
  }
};
var ToastsService = class _ToastsService {
  constructor() {
    this._toasts = signal(List([]));
    this.value = this._toasts.asReadonly();
  }
  create(text, config) {
    const toast = new Toast(text, this._toasts, config);
    this._toasts.update((l) => l.push(toast));
    return toast.destroyPromise;
  }
  static {
    this.ɵfac = function ToastsService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToastsService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ToastsService,
      factory: _ToastsService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ToastOutletComponent = class _ToastOutletComponent {
  constructor() {
    this.toasts = inject(ToastsService);
    this.default = computed(() => this.toasts.value().filter((t) => t.config.type === ToastType.Default));
    this.notifications = computed(() => this.toasts.value().filter((t) => t.config.type === ToastType.Notification));
  }
  static {
    this.ɵfac = function ToastOutletComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToastOutletComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ToastOutletComponent,
      selectors: [["ngx-toast-outlet"]],
      decls: 6,
      vars: 0,
      consts: [[1, "outlet", "default"], [3, "toast"], [1, "outlet", "notifications"]],
      template: function ToastOutletComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0);
          ɵɵrepeaterCreate(1, ToastOutletComponent_For_2_Template, 1, 1, "ngx-toast", 1, _forTrack0);
          ɵɵelementEnd();
          ɵɵelementStart(3, "div", 2);
          ɵɵrepeaterCreate(4, ToastOutletComponent_For_5_Template, 1, 1, "ngx-toast", 1, _forTrack0);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵrepeater(ctx.default());
          ɵɵadvance(3);
          ɵɵrepeater(ctx.notifications());
        }
      },
      dependencies: [ToastComponent],
      styles: ["[_nghost-%COMP%]   .outlet[_ngcontent-%COMP%]{position:fixed;width:100%;height:0}[_nghost-%COMP%]   .outlet.default[_ngcontent-%COMP%]{top:0;left:0;display:flex;flex-direction:column;align-items:center}[_nghost-%COMP%]   .outlet.notifications[_ngcontent-%COMP%]{bottom:16px;left:0;display:flex;flex-direction:column-reverse;align-items:flex-start}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastOutletComponent, [{
    type: Component,
    args: [{
      selector: "ngx-toast-outlet",
      imports: [ToastComponent],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: '<div class="outlet default">\n  @for (toast of default(); track toast.createdAt) {\n    <ngx-toast [toast]="toast" />\n  }\n</div>\n<div class="outlet notifications">\n  @for (toast of notifications(); track toast.createdAt) {\n    <ngx-toast [toast]="toast" />\n  }\n</div>\n',
      styles: [":host .outlet{position:fixed;width:100%;height:0}:host .outlet.default{top:0;left:0;display:flex;flex-direction:column;align-items:center}:host .outlet.notifications{bottom:16px;left:0;display:flex;flex-direction:column-reverse;align-items:flex-start}\n"]
    }]
  }], null, null);
})();
var TOASTS_COMPONENTS = [ToastOutletComponent];
export {
  TOASTS_COMPONENTS,
  ToastOutletComponent,
  ToastType,
  ToastsService
};
//# sourceMappingURL=@ngx-templates_shared_toasts.js.map
