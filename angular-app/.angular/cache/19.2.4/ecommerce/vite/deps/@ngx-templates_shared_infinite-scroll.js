import {
  WINDOW
} from "./chunk-JHWPVBPL.js";
import {
  IconComponent
} from "./chunk-HJNUGYEB.js";
import {
  DOCUMENT,
  isPlatformBrowser
} from "./chunk-AXP32RGN.js";
import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  PLATFORM_ID,
  Renderer2,
  inject,
  input,
  output,
  setClassMetadata,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext
} from "./chunk-EDUAMG3U.js";
import "./chunk-WDMUDEB6.js";

// node_modules/@ngx-templates/shared/fesm2022/ngx-templates-shared-infinite-scroll.mjs
var SCROLL_OFFSET = 320;
var InfiniteScrollComponent = class _InfiniteScrollComponent {
  constructor() {
    this._win = inject(WINDOW);
    this._doc = inject(DOCUMENT);
    this._platformId = inject(PLATFORM_ID);
    this._renderer = inject(Renderer2);
    this._zone = inject(NgZone);
    this._endReached = false;
    this._listeners = [];
    this.scrollCont = input(null);
    this.loadNext = output();
  }
  ngOnInit() {
    this._addEventListeners();
  }
  ngOnDestroy() {
    for (const l of this._listeners) {
      l();
    }
  }
  onLoadNext() {
    this._endReached = true;
    this.loadNext.emit(() => {
      this._endReached = false;
    });
  }
  _addEventListeners() {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }
    this._zone.runOutsideAngular(() => {
      const scrollCont = this.scrollCont();
      let listener;
      const endReached = (scrollHeight, scrolledY) => {
        if (!this._endReached && SCROLL_OFFSET >= scrollHeight - scrolledY) {
          this._zone.run(() => this.onLoadNext());
        }
      };
      if (!scrollCont) {
        listener = this._renderer.listen(this._win, "scroll", () => {
          const scrolledY = this._win.scrollY + this._win.innerHeight;
          const scrollHeight = this._doc.body.scrollHeight;
          endReached(scrollHeight, scrolledY);
        });
      } else {
        const el = scrollCont;
        listener = this._renderer.listen(el, "scroll", () => {
          const scrolledY = el.clientHeight + Math.abs(el.scrollTop);
          endReached(el.scrollHeight, scrolledY);
        });
      }
      this._listeners.push(listener);
    });
  }
  static {
    this.ɵfac = function InfiniteScrollComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InfiniteScrollComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _InfiniteScrollComponent,
      selectors: [["ngx-infinite-scroll"]],
      inputs: {
        scrollCont: [1, "scrollCont"]
      },
      outputs: {
        loadNext: "loadNext"
      },
      decls: 4,
      vars: 0,
      consts: [["aria-label", "Load more products", 1, "fallback-btn", 3, "click"], ["size", "lg", "name", "Downloading"]],
      template: function InfiniteScrollComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "button", 0);
          ɵɵlistener("click", function InfiniteScrollComponent_Template_button_click_0_listener() {
            return ctx.onLoadNext();
          });
          ɵɵelement(1, "ngx-icon", 1);
          ɵɵelementStart(2, "span");
          ɵɵtext(3, "Load More");
          ɵɵelementEnd()();
        }
      },
      dependencies: [IconComponent],
      styles: ["[_nghost-%COMP%]{display:flex;justify-content:center;margin-top:3rem}[_nghost-%COMP%]   button[_ngcontent-%COMP%]{color:var(--color-quaternary);background-color:transparent;transition:color .3s ease;align-items:center;border:none;display:flex;font-weight:600}[_nghost-%COMP%]   button[_ngcontent-%COMP%]   ngx-icon[_ngcontent-%COMP%]{margin-right:.5rem}[_nghost-%COMP%]   button[_ngcontent-%COMP%]:hover{color:var(--color-primary)}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InfiniteScrollComponent, [{
    type: Component,
    args: [{
      selector: "ngx-infinite-scroll",
      imports: [IconComponent],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: '<button\n  class="fallback-btn"\n  (click)="onLoadNext()"\n  aria-label="Load more products"\n>\n  <ngx-icon size="lg" name="Downloading" />\n  <span>Load More</span>\n</button>\n',
      styles: [":host{display:flex;justify-content:center;margin-top:3rem}:host button{color:var(--color-quaternary);background-color:transparent;transition:color .3s ease;align-items:center;border:none;display:flex;font-weight:600}:host button ngx-icon{margin-right:.5rem}:host button:hover{color:var(--color-primary)}\n"]
    }]
  }], null, null);
})();
export {
  InfiniteScrollComponent
};
//# sourceMappingURL=@ngx-templates_shared_infinite-scroll.js.map
