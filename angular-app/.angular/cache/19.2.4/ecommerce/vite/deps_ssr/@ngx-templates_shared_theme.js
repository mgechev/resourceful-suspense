import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  LocalStorage
} from "./chunk-JOJ5TD4W.js";
import {
  IconComponent
} from "./chunk-QMG2FP3X.js";
import {
  DOCUMENT
} from "./chunk-EWETOJTL.js";
import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Pipe,
  RendererFactory2,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefinePipe,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-RMUIWRBI.js";
import "./chunk-YHCV7DAQ.js";

// node_modules/@ngx-templates/shared/fesm2022/ngx-templates-shared-theme.mjs
function ThemeSwitchComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵpipe(2, "themeLabel");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, ctx_r0.currentTheme()));
  }
}
var THEME_LS_KEY = "ngx-theme";
var getThemeClass = (t) => `ngx-${t}-theme`;
var ThemeService = class _ThemeService {
  constructor(rendererFactory) {
    this._doc = inject(DOCUMENT);
    this._storage = inject(LocalStorage);
    this._current = signal(null);
    this._renderer = rendererFactory.createRenderer(null, null);
  }
  /**
   * Returns a read-only Signal with the current theme.
   *
   * @returns
   */
  getTheme() {
    this._initSignal();
    return this._current.asReadonly();
  }
  /**
   * Change current theme to light, dark or system one
   *
   * @param theme
   */
  setTheme(theme) {
    this._initSignal();
    const doc = this._doc.documentElement;
    if (this._current() !== "system") {
      this._renderer.removeClass(doc, getThemeClass(this._current()));
      this._storage.remove(THEME_LS_KEY);
    }
    if (theme !== "system") {
      this._renderer.addClass(doc, getThemeClass(theme));
      this._storage.set(THEME_LS_KEY, theme);
    }
    this._current.set(theme);
  }
  /**
   * Initialize the current theme signal from the local storage, if null.
   */
  _initSignal() {
    if (!this._current()) {
      const current = this._storage.get(THEME_LS_KEY);
      this._current.set(current ? current : "system");
    }
  }
  static {
    this.ɵfac = function ThemeService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ThemeService)(ɵɵinject(RendererFactory2));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ThemeService,
      factory: _ThemeService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: RendererFactory2
  }], null);
})();
var THEME_TO_LABEL = {
  ["system"]: "System",
  ["light"]: "Light",
  ["dark"]: "Dark"
};
var ThemeLabelPipe = class _ThemeLabelPipe {
  transform(value) {
    return THEME_TO_LABEL[value];
  }
  static {
    this.ɵfac = function ThemeLabelPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ThemeLabelPipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "themeLabel",
      type: _ThemeLabelPipe,
      pure: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeLabelPipe, [{
    type: Pipe,
    args: [{
      name: "themeLabel"
    }]
  }], null, null);
})();
var THEME_SEQ = ["system", "light", "dark"];
var THEME_TO_ICON = {
  ["system"]: "Routine",
  ["light"]: "LightMode",
  ["dark"]: "DarkMode"
};
var ThemeSwitchComponent = class _ThemeSwitchComponent {
  constructor() {
    this._theme = inject(ThemeService);
    this.currentTheme = this._theme.getTheme();
    this.iconOnly = input(false);
    this.THEME_TO_ICON = THEME_TO_ICON;
  }
  onThemeSwitch() {
    const currentIdx = THEME_SEQ.findIndex((t) => t === this.currentTheme());
    const newIdx = (currentIdx + 1) % THEME_SEQ.length;
    this._theme.setTheme(THEME_SEQ[newIdx]);
  }
  static {
    this.ɵfac = function ThemeSwitchComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ThemeSwitchComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ThemeSwitchComponent,
      selectors: [["ngx-theme-switch"]],
      inputs: {
        iconOnly: [1, "iconOnly"]
      },
      decls: 4,
      vars: 5,
      consts: [[3, "click", "title"], ["size", "xlg", 3, "name"]],
      template: function ThemeSwitchComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "button", 0);
          ɵɵpipe(1, "themeLabel");
          ɵɵlistener("click", function ThemeSwitchComponent_Template_button_click_0_listener() {
            return ctx.onThemeSwitch();
          });
          ɵɵtemplate(2, ThemeSwitchComponent_Conditional_2_Template, 3, 3, "span");
          ɵɵelement(3, "ngx-icon", 1);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵproperty("title", !ctx.iconOnly() ? "Change the current theme" : ɵɵpipeBind1(1, 3, ctx.currentTheme()));
          ɵɵadvance(2);
          ɵɵconditional(!ctx.iconOnly() ? 2 : -1);
          ɵɵadvance();
          ɵɵproperty("name", ctx.THEME_TO_ICON[ctx.currentTheme()]);
        }
      },
      dependencies: [IconComponent, ThemeLabelPipe],
      styles: ["[_nghost-%COMP%]   button[_ngcontent-%COMP%]{text-transform:uppercase;font-size:.625rem;letter-spacing:.125rem}[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   button[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-end;width:auto;height:auto;border:none;background:transparent;padding:0;color:var(--color-quaternary);transition:color .3s ease;cursor:pointer}[_nghost-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-right:.25rem;width:0;overflow:hidden;transition:width .2s ease}[_nghost-%COMP%]   button[_ngcontent-%COMP%]:hover > span[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   button[_ngcontent-%COMP%]:hover{color:var(--color-primary)}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeSwitchComponent, [{
    type: Component,
    args: [{
      selector: "ngx-theme-switch",
      imports: [IconComponent, ThemeLabelPipe],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<button
  (click)="onThemeSwitch()"
  [title]="
    !iconOnly() ? 'Change the current theme' : (currentTheme() | themeLabel)
  "
>
  @if (!iconOnly()) {
    <span>{{ currentTheme() | themeLabel }}</span>
  }
  <ngx-icon [name]="THEME_TO_ICON[currentTheme()]" size="xlg" />
</button>
`,
      styles: [":host button{text-transform:uppercase;font-size:.625rem;letter-spacing:.125rem}:host{display:block}:host button{display:flex;align-items:center;justify-content:flex-end;width:auto;height:auto;border:none;background:transparent;padding:0;color:var(--color-quaternary);transition:color .3s ease;cursor:pointer}:host button span{margin-right:.25rem;width:0;overflow:hidden;transition:width .2s ease}:host button:hover>span{width:100%}:host button:hover{color:var(--color-primary)}\n"]
    }]
  }], null, null);
})();
var THEME_COMPONENTS = [ThemeSwitchComponent];
export {
  THEME_COMPONENTS,
  ThemeService,
  ThemeSwitchComponent
};
//# sourceMappingURL=@ngx-templates_shared_theme.js.map
