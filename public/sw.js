if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const o=e=>n(e,c),r={module:{uri:c},exports:t,require:o};s[c]=Promise.all(a.map((e=>r[e]||o(e)))).then((e=>(i(...e),t)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"29bd5798c02b49360958b6ca0606f031"},{url:"/_next/static/5qpr3elOELd5goHB2Fv6g/_buildManifest.js",revision:"50654c4134ba6f71b423498e9447ee91"},{url:"/_next/static/5qpr3elOELd5goHB2Fv6g/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/34-b5f25cdaf60c147c.js",revision:"5qpr3elOELd5goHB2Fv6g"},{url:"/_next/static/chunks/472-ddf9d359844f58dd.js",revision:"5qpr3elOELd5goHB2Fv6g"},{url:"/_next/static/chunks/655.9072ae531f7da9ac.js",revision:"9072ae531f7da9ac"},{url:"/_next/static/chunks/719-d76996644c5128ed.js",revision:"5qpr3elOELd5goHB2Fv6g"},{url:"/_next/static/chunks/831.d3d479fed34bc1f5.js",revision:"d3d479fed34bc1f5"},{url:"/_next/static/chunks/app/_not-found-f978abc608c0c49a.js",revision:"5qpr3elOELd5goHB2Fv6g"},{url:"/_next/static/chunks/app/layout-5065fdae6873d9d7.js",revision:"5qpr3elOELd5goHB2Fv6g"},{url:"/_next/static/chunks/app/page-9660bf4ac4aae1a3.js",revision:"5qpr3elOELd5goHB2Fv6g"},{url:"/_next/static/chunks/app/template-c22da4ed381d8f2d.js",revision:"5qpr3elOELd5goHB2Fv6g"},{url:"/_next/static/chunks/fd9d1056-ffc0c85363a68abe.js",revision:"5qpr3elOELd5goHB2Fv6g"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"5qpr3elOELd5goHB2Fv6g"},{url:"/_next/static/chunks/main-app-3eed719a2491bba3.js",revision:"5qpr3elOELd5goHB2Fv6g"},{url:"/_next/static/chunks/main-f9b3d09f9281e44f.js",revision:"5qpr3elOELd5goHB2Fv6g"},{url:"/_next/static/chunks/pages/_app-1534f180665c857f.js",revision:"5qpr3elOELd5goHB2Fv6g"},{url:"/_next/static/chunks/pages/_error-b646007f40c4f0a8.js",revision:"5qpr3elOELd5goHB2Fv6g"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-55690560fc3a2f8f.js",revision:"5qpr3elOELd5goHB2Fv6g"},{url:"/_next/static/css/16dc1b4b0d97fddc.css",revision:"16dc1b4b0d97fddc"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/favicon.ico",revision:"b7e5d143f696329db9b04f047c8ba284"},{url:"/logo/phone-book-brand.svg",revision:"f42d088ff447c4da9b8972c415ec2fe1"},{url:"/logo/phone-book-happy.svg",revision:"fa09263d0e0603e88ad404d72e7e591a"},{url:"/logo/phone-book-sad.svg",revision:"f124957f686d00fa33b66d1ca252c450"},{url:"/logo/search-icon.svg",revision:"42ad6c8538a99fbde49d9e0c1a4759f7"},{url:"/logo/user-icon.png",revision:"4968cec97ab9fabd2a2a3ed0148e3845"},{url:"/manifest.json",revision:"56704a8d0d3bdc1f37394414357328ce"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
