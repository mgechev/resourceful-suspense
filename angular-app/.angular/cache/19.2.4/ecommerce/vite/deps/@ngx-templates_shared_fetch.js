import {
  InjectionToken,
  Injector
} from "./chunk-EDUAMG3U.js";
import {
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// node_modules/@ngx-templates/shared/fesm2022/ngx-templates-shared-fetch.mjs
var FETCH_API = new InjectionToken("FETCH_API");
var provideFetchApi = (customImpl) => ({
  provide: FETCH_API,
  // We need to bind the native fetch to globalThis since we are in SSR mode
  // or it will throw an "Illegal invocation"
  useFactory: (injector) => customImpl ? customImpl(injector) : fetch.bind(globalThis),
  deps: [Injector]
});
function fetchAbort() {
  const abortCtrls = /* @__PURE__ */ new Map();
  return (apiName) => {
    let ctrl = abortCtrls.get(apiName);
    if (ctrl) {
      ctrl.abort();
    }
    ctrl = new AbortController();
    abortCtrls.set(apiName, ctrl);
    return ctrl.signal;
  };
}
function simulateRequest(jsonDataFn, config, log, abortSignal) {
  let timeout;
  let reject = () => {
  };
  let completed = false;
  let abort = false;
  abortSignal?.addEventListener("abort", () => {
    if (!completed) {
      log("Request aborted");
      abort = true;
      clearTimeout(timeout);
      reject({
        ok: false
      });
    }
  });
  return new Promise((res, rej) => {
    reject = rej;
    timeout = setTimeout(() => {
      Promise.resolve(jsonDataFn()).then((resolvedJsonData) => {
        if (abort) {
          return;
        }
        log("Responding with data", resolvedJsonData || "<<EMPTY>>");
        completed = true;
        res({
          ok: true,
          json: () => Promise.resolve(resolvedJsonData)
        });
      });
    }, config.responseDelay);
  });
}
var DEFAULT_CFG = {
  responseDelay: 200,
  logging: true
};
var withFetchMock = (mockFn, config) => {
  const fullCfg = __spreadValues(__spreadValues({}, DEFAULT_CFG), config);
  const log = (msg, obj) => {
    if (fullCfg?.logging) {
      const prefix = msg[0] !== "*";
      msg = prefix ? msg : msg.slice(1);
      console.info(prefix ? "Fetch API Mock:" : "", msg.trim(), obj || "");
    }
  };
  return (injector) => (url, options) => {
    const method = options?.method || "GET";
    log("*");
    log(`Executing request ${method} ${url}`);
    const body = options?.body ? JSON.parse(options.body) : null;
    if (body) {
      log("Body", body);
    }
    return simulateRequest(() => mockFn(url.toString(), method, body, injector), fullCfg, log, options?.signal);
  };
};
var FETCH_MOCK_STATE = new InjectionToken("FETCH_MOCK_STATE");
var provideFetchMockState = () => ({
  provide: FETCH_MOCK_STATE,
  useValue: {
    state: null
  }
});
export {
  FETCH_API,
  FETCH_MOCK_STATE,
  fetchAbort,
  provideFetchApi,
  provideFetchMockState,
  withFetchMock
};
//# sourceMappingURL=@ngx-templates_shared_fetch.js.map
