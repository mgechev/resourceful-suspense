import {
  DomSanitizer
} from "./chunk-NIZYR6PG.js";
import {
  isPlatformBrowser
} from "./chunk-AXP32RGN.js";
import {
  PLATFORM_ID,
  Pipe,
  inject,
  setClassMetadata,
  ɵɵdefinePipe
} from "./chunk-EDUAMG3U.js";
import "./chunk-WDMUDEB6.js";

// node_modules/@ngx-templates/shared/fesm2022/ngx-templates-shared-utils.mjs
var filterParamValue = (paramVal) => paramVal.replace(/\?|=|\$|&/g, "").replace(/\s/g, "+");
function buildQueryParamsString(params) {
  if (!params) {
    return "";
  }
  const paramParts = [];
  for (const key in params) {
    if (!params[key]) {
      continue;
    }
    const value = params[key];
    let processedValue = value;
    if (typeof params[key] === "string") {
      processedValue = filterParamValue(params[key]);
    } else if (params[key] instanceof Array) {
      processedValue = params[key].join(",");
    }
    paramParts.push(`${key}=${processedValue}`);
  }
  return "?" + paramParts.join("&");
}
var SafeHtmlPipe = class _SafeHtmlPipe {
  constructor() {
    this._sanitizer = inject(DomSanitizer);
    this._platformId = inject(PLATFORM_ID);
  }
  transform(html) {
    const sanitized = this._sanitizeHtml(html);
    return this._sanitizer.bypassSecurityTrustHtml(sanitized);
  }
  _sanitizeHtml(html) {
    if (!isPlatformBrowser(this._platformId)) {
      return "";
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const scriptTags = doc.querySelectorAll("script");
    scriptTags.forEach((s) => s.remove());
    return doc.body.innerHTML;
  }
  static {
    this.ɵfac = function SafeHtmlPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SafeHtmlPipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "safeHtml",
      type: _SafeHtmlPipe,
      pure: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SafeHtmlPipe, [{
    type: Pipe,
    args: [{
      name: "safeHtml"
    }]
  }], null, null);
})();
function generateShortUUID() {
  const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let uuid = "";
  for (let i = 0; i < 8; i++) {
    uuid += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return uuid;
}
export {
  SafeHtmlPipe,
  buildQueryParamsString,
  generateShortUUID
};
//# sourceMappingURL=@ngx-templates_shared_utils.js.map
