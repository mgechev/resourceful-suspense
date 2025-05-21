import {
  isPlatformBrowser
} from "./chunk-AXP32RGN.js";
import {
  Injectable,
  InjectionToken,
  PLATFORM_ID,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-EDUAMG3U.js";

// node_modules/@ngx-templates/shared/fesm2022/ngx-templates-shared-services.mjs
var LocalStorage = class _LocalStorage {
  constructor() {
    this._platformId = inject(PLATFORM_ID);
  }
  get _isBrowser() {
    return isPlatformBrowser(this._platformId);
  }
  get(key) {
    if (!this._isBrowser) {
      return null;
    }
    return localStorage.getItem(key);
  }
  getJSON(key) {
    if (!this._isBrowser) {
      return null;
    }
    const item = this.get(key);
    try {
      return JSON.parse(item || "");
    } catch {
      return null;
    }
  }
  set(key, data) {
    if (!this._isBrowser) {
      return;
    }
    localStorage.setItem(key, data);
  }
  setJSON(key, data) {
    if (!this._isBrowser) {
      return;
    }
    localStorage.setItem(key, JSON.stringify(data));
  }
  remove(key) {
    if (!this._isBrowser) {
      return;
    }
    localStorage.removeItem(key);
  }
  clear() {
    if (!this._isBrowser) {
      return;
    }
    localStorage.clear();
  }
  static {
    this.ɵfac = function LocalStorage_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LocalStorage)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _LocalStorage,
      factory: _LocalStorage.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocalStorage, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var WINDOW = new InjectionToken("WINDOW");
var provideWindow = () => ({
  provide: WINDOW,
  useFactory: () => {
    const platformId = inject(PLATFORM_ID);
    return isPlatformBrowser(platformId) ? window : {};
  }
});

export {
  LocalStorage,
  WINDOW,
  provideWindow
};
//# sourceMappingURL=chunk-JHWPVBPL.js.map
