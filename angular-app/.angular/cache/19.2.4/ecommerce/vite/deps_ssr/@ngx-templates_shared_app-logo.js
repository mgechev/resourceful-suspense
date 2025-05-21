import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  RouterLink
} from "./chunk-U2FBK7BC.js";
import "./chunk-GOICMUZF.js";
import {
  CommonModule,
  NgTemplateOutlet
} from "./chunk-EWETOJTL.js";
import {
  ChangeDetectionStrategy,
  Component,
  input,
  setClassMetadata,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-RMUIWRBI.js";
import "./chunk-YHCV7DAQ.js";

// node_modules/@ngx-templates/shared/fesm2022/ngx-templates-shared-app-logo.mjs
function AppLogoComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 3);
    ɵɵelementStart(1, "span", 4);
    ɵɵtext(2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r0.text());
  }
}
function AppLogoComponent_Conditional_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function AppLogoComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "a", 1);
    ɵɵtemplate(1, AppLogoComponent_Conditional_2_ng_container_1_Template, 1, 0, "ng-container", 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const content_r2 = ɵɵreference(1);
    ɵɵproperty("routerLink", ctx_r0.routerLink());
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", content_r2);
  }
}
function AppLogoComponent_Conditional_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function AppLogoComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵtemplate(1, AppLogoComponent_Conditional_3_ng_container_1_Template, 1, 0, "ng-container", 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    ɵɵnextContext();
    const content_r2 = ɵɵreference(1);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", content_r2);
  }
}
var AppLogoComponent = class _AppLogoComponent {
  constructor() {
    this.text = input.required();
    this.routerLink = input("");
  }
  static {
    this.ɵfac = function AppLogoComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppLogoComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _AppLogoComponent,
      selectors: [["ngx-app-logo"]],
      inputs: {
        text: [1, "text"],
        routerLink: [1, "routerLink"]
      },
      decls: 4,
      vars: 1,
      consts: [["content", ""], ["aria-label", "Logo - Home page", 1, "logo", 3, "routerLink"], ["aria-label", "Logo", 1, "logo"], [1, "ng-logo"], [1, "text"], [4, "ngTemplateOutlet"]],
      template: function AppLogoComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, AppLogoComponent_ng_template_0_Template, 3, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, AppLogoComponent_Conditional_2_Template, 2, 2, "a", 1)(3, AppLogoComponent_Conditional_3_Template, 2, 1, "div", 2);
        }
        if (rf & 2) {
          ɵɵadvance(2);
          ɵɵconditional(ctx.routerLink() ? 2 : 3);
        }
      },
      dependencies: [RouterLink, CommonModule, NgTemplateOutlet],
      styles: [`[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   .logo[_ngcontent-%COMP%]{display:flex;align-items:center;font-size:24px;font-weight:500;text-decoration:none;-webkit-user-select:none;user-select:none}[_nghost-%COMP%]   .logo[_ngcontent-%COMP%]   .ng-logo[_ngcontent-%COMP%]{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 223 236">%0A  <g clip-path="url(%23a)">%0A    <path fill="url(%23b)" d="m222.077 39.192-8.019 125.923L137.387 0l84.69 39.192Zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301l11.783 28.556ZM111.039 62.675l30.357 73.803H80.681l30.358-73.803ZM7.937 165.115 0 39.192 84.69 0 7.937 165.115Z"></path>%0A    <path fill="url(%23c)" d="m222.077 39.192-8.019 125.923L137.387 0l84.69 39.192Zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301l11.783 28.556ZM111.039 62.675l30.357 73.803H80.681l30.358-73.803ZM7.937 165.115 0 39.192 84.69 0 7.937 165.115Z"></path>%0A  </g>%0A  <defs >%0A    <linearGradient id="b" x1="49.009" x2="225.829" y1="213.75" y2="129.722" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23E40035"></stop>%0A      <stop offset=".24" stop-color="%23F60A48"></stop>%0A      <stop offset=".352" stop-color="%23F20755"></stop>%0A      <stop offset=".494" stop-color="%23DC087D"></stop>%0A      <stop offset=".745" stop-color="%239717E7"></stop>%0A      <stop offset="1" stop-color="%236C00F5"></stop>%0A    </linearGradient>%0A    <linearGradient id="c" x1="41.025" x2="156.741" y1="28.344" y2="160.344" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23FF31D9"></stop>%0A      <stop offset="1" stop-color="%23FF5BE1" stop-opacity="0"></stop>%0A    </linearGradient>%0A    <clipPath id="a">%0A      <path fill="%23fff" d="M0 0h223v236H0z"></path>%0A    </clipPath>%0A  </defs>%0A</svg>%0A') no-repeat;width:30px;height:32px;margin-right:12px}[_nghost-%COMP%]   .logo[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{background:var(--gradient-magenta-to-light-purple);-webkit-background-clip:text;background-size:140% 140%;background-clip:text;color:transparent;transition:background-position-x .5s ease}[_nghost-%COMP%]   .logo[_ngcontent-%COMP%]:hover   .text[_ngcontent-%COMP%]{background-position-x:80%}`],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppLogoComponent, [{
    type: Component,
    args: [{
      selector: "ngx-app-logo",
      imports: [RouterLink, CommonModule],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: '<ng-template #content>\n  <div class="ng-logo"></div>\n  <span class="text">{{ text() }}</span>\n</ng-template>\n\n@if (routerLink()) {\n  <a [routerLink]="routerLink()" class="logo" aria-label="Logo - Home page">\n    <ng-container *ngTemplateOutlet="content" />\n  </a>\n} @else {\n  <div class="logo" aria-label="Logo">\n    <ng-container *ngTemplateOutlet="content" />\n  </div>\n}\n',
      styles: [`:host{display:block}:host .logo{display:flex;align-items:center;font-size:24px;font-weight:500;text-decoration:none;-webkit-user-select:none;user-select:none}:host .logo .ng-logo{background:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 223 236">%0A  <g clip-path="url(%23a)">%0A    <path fill="url(%23b)" d="m222.077 39.192-8.019 125.923L137.387 0l84.69 39.192Zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301l11.783 28.556ZM111.039 62.675l30.357 73.803H80.681l30.358-73.803ZM7.937 165.115 0 39.192 84.69 0 7.937 165.115Z"></path>%0A    <path fill="url(%23c)" d="m222.077 39.192-8.019 125.923L137.387 0l84.69 39.192Zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301l11.783 28.556ZM111.039 62.675l30.357 73.803H80.681l30.358-73.803ZM7.937 165.115 0 39.192 84.69 0 7.937 165.115Z"></path>%0A  </g>%0A  <defs >%0A    <linearGradient id="b" x1="49.009" x2="225.829" y1="213.75" y2="129.722" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23E40035"></stop>%0A      <stop offset=".24" stop-color="%23F60A48"></stop>%0A      <stop offset=".352" stop-color="%23F20755"></stop>%0A      <stop offset=".494" stop-color="%23DC087D"></stop>%0A      <stop offset=".745" stop-color="%239717E7"></stop>%0A      <stop offset="1" stop-color="%236C00F5"></stop>%0A    </linearGradient>%0A    <linearGradient id="c" x1="41.025" x2="156.741" y1="28.344" y2="160.344" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23FF31D9"></stop>%0A      <stop offset="1" stop-color="%23FF5BE1" stop-opacity="0"></stop>%0A    </linearGradient>%0A    <clipPath id="a">%0A      <path fill="%23fff" d="M0 0h223v236H0z"></path>%0A    </clipPath>%0A  </defs>%0A</svg>%0A') no-repeat;width:30px;height:32px;margin-right:12px}:host .logo .text{background:var(--gradient-magenta-to-light-purple);-webkit-background-clip:text;background-size:140% 140%;background-clip:text;color:transparent;transition:background-position-x .5s ease}:host .logo:hover .text{background-position-x:80%}
`]
    }]
  }], null, null);
})();
export {
  AppLogoComponent
};
//# sourceMappingURL=@ngx-templates_shared_app-logo.js.map
