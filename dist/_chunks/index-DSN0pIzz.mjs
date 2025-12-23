import { useRef, useEffect } from "react";
import { jsxs, jsx } from "react/jsx-runtime";
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const PLUGIN_ID = "admin-pannel";
const Initializer = ({ setPlugin }) => {
  const ref = useRef(setPlugin);
  useEffect(() => {
    ref.current(PLUGIN_ID);
  }, []);
  return null;
};
const VoiceCall = ({ style }) => /* @__PURE__ */ jsx("svg", { style, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M14.5562 15.5477L14.1007 16.0272C14.1007 16.0272 13.0181 17.167 10.0631 14.0559C7.10812 10.9448 8.1907 9.80507 8.1907 9.80507L8.47752 9.50311C9.18407 8.75924 9.25068 7.56497 8.63424 6.6931L7.37326 4.90961C6.61028 3.8305 5.13596 3.68795 4.26145 4.60864L2.69185 6.26114C2.25823 6.71766 1.96765 7.30945 2.00289 7.96594C2.09304 9.64546 2.81071 13.259 6.81536 17.4752C11.0621 21.9462 15.0468 22.1239 16.6763 21.9631C17.1917 21.9122 17.6399 21.6343 18.0011 21.254L19.4217 19.7584C20.3806 18.7489 20.1102 17.0182 18.8833 16.312L16.9728 15.2123C16.1672 14.7486 15.1858 14.8848 14.5562 15.5477Z", fill: "currentColor" }) });
const VideoCall = ({ style }) => /* @__PURE__ */ jsxs("svg", { style, viewBox: "0 0 48 48", version: "1", xmlns: "http://www.w3.org/2000/svg", "enable-background": "new 0 0 48 48", children: [
  /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8,12h22c2.2,0,4,1.8,4,4v16c0,2.2-1.8,4-4,4H8c-2.2,0-4-1.8-4-4V16C4,13.8,5.8,12,8,12z" }),
  /* @__PURE__ */ jsx("polygon", { fill: "currentColor", points: "44,35 34,29 34,19 44,13" })
] });
const PluginIcon = ({ style }) => /* @__PURE__ */ jsxs("svg", { style: { width: "24px", height: "24px", ...style }, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ jsx("path", { d: "M15.75 4C15.75 3.58579 15.4142 3.25 15 3.25C14.5858 3.25 14.25 3.58579 14.25 4L14.25 5.052C14.2499 5.95048 14.2499 6.6997 14.3299 7.29448C14.4143 7.92227 14.6 8.48907 15.0554 8.94454C15.5109 9.40001 16.0777 9.58568 16.7055 9.67009C17.1662 9.73202 17.7195 9.74597 18.363 9.7491L17.5315 10.4143C17.208 10.6731 17.1556 11.1451 17.4143 11.4685C17.6731 11.792 18.145 11.8444 18.4685 11.5857L20.9685 9.58565C21.1464 9.44332 21.25 9.22784 21.25 9C21.25 8.77216 21.1464 8.55668 20.9685 8.41435L18.4685 6.41435C18.145 6.15559 17.6731 6.20803 17.4143 6.53148C17.1556 6.85493 17.208 7.32689 17.5315 7.58565L18.3605 8.24888C17.7356 8.24561 17.2729 8.23287 16.9054 8.18346C16.4439 8.12142 16.2464 8.0142 16.1161 7.88388C15.9858 7.75357 15.8786 7.55607 15.8165 7.09461C15.7516 6.61157 15.75 5.96401 15.75 5V4Z", fill: "currentColor" }),
  /* @__PURE__ */ jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M10.6925 4.95067C9.52266 2.85455 6.68752 2.72683 5.00745 4.4069C4.10879 5.30556 3.3103 6.50048 3.25706 7.90468C3.17818 9.98561 3.71556 13.4408 7.13735 16.8626C10.5591 20.2844 14.0144 20.8218 16.0953 20.7429C17.4995 20.6897 18.6944 19.8912 19.5931 18.9925C21.2731 17.3125 21.1454 14.4773 19.0493 13.3075L17.8864 12.6585C16.5176 11.8946 14.7905 12.2201 13.6585 13.3384C13.6381 13.3533 13.5231 13.4323 13.3221 13.4421C13.0656 13.4545 12.4729 13.3633 11.5548 12.4452C10.6364 11.5267 10.5454 10.9339 10.5579 10.6776C10.5677 10.4768 10.6467 10.3619 10.6616 10.3415C11.7799 9.2095 12.1054 7.48242 11.3415 6.1136L10.6925 4.95067ZM6.06811 5.46756C7.17394 4.36173 8.78363 4.60832 9.38265 5.68167L10.0317 6.8446C10.4354 7.56801 10.2977 8.58415 9.58435 9.29747C9.51471 9.36712 9.09846 9.81276 9.0597 10.6043C9.02003 11.4146 9.38395 12.3956 10.4942 13.5058C11.604 14.6157 12.5847 14.9797 13.395 14.9403C14.1864 14.9018 14.6322 14.4858 14.7023 14.4158C15.4156 13.7025 16.432 13.5646 17.1554 13.9683L18.3183 14.6173C19.3916 15.2163 19.6382 16.826 18.5324 17.9319C17.7571 18.7072 16.9013 19.2113 16.0385 19.244C14.3031 19.3098 11.2774 18.8813 8.19801 15.802C5.11864 12.7226 4.6902 9.69684 4.75599 7.9615C4.7887 7.09872 5.29276 6.24291 6.06811 5.46756Z", fill: "currentColor" })
] });
const Cross = ({ style }) => /* @__PURE__ */ jsx("svg", { style, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M18 6L6 18M6 6L18 18", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) });
const Tick = ({ style }) => /* @__PURE__ */ jsx("svg", { style, width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M10 3L4.5 8.5L2 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
const ChevronDown = () => /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: { marginLeft: "4px" }, children: /* @__PURE__ */ jsx("path", { d: "M2.5 4.5L6 8L9.5 4.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
const index = {
  register(app) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID
      },
      Component: async () => {
        const { App } = await import("./App-BtcthGio.mjs");
        return App;
      }
    });
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID
    });
  },
  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => import("./en-Byx4XI2L.mjs") }), `./translations/${locale}.json`, 3);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  }
};
export {
  Cross as C,
  PluginIcon as P,
  Tick as T,
  VoiceCall as V,
  VideoCall as a,
  ChevronDown as b,
  index as i
};
