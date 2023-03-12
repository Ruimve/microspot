<div align="center">
  <h1>microspot</h1>

  <a href="https://github.com/Ruimve">
    <img
      width="80"
      alt="Ruimve"
      src="https://github.com/Ruimve/materials/blob/main/images/spirit.png?raw=true"
    />
  </a>

  <p>前端监控 SDK</p>
</div>
<hr />

[![Build Status][build-badge]][build]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]
[![PRs Welcome][prs-badge]][prs]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
<!-- [![Code Coverage][coverage-badge]][coverage] -->

## 内容列表

- [简介](#简介)
- [如何消费](#如何消费)
  - [支持 CDN 引入](#支持-cdn-引入)
  - [支持 ES Module](#支持-es-module)
- [监控项](#监控项)
  - [异常监控](#异常监控)
    - [运行时异常](#监控-js-运行时异常)
    - [资源加载异常](#监控资源加载异常)
    - [Promise 拒绝未处理](#捕获拒绝未处理的-promise)
    - [白屏](#白屏)
    - [Ajax 请求](#监控-ajax)
    - [Fetch 请求](#监控-fetch)
  - [性能监控](#性能监控)
    - [核心指标](#lcp-largest-contentful-paint-最大内容绘制)
      - [最大内容绘制（LCP）](#lcp-largest-contentful-paint-最大内容绘制)
      - [首次输入延迟（FID）](#fid-first-input-delay-首次输入延迟)
      - [累计布局位移（CLS）](#cls-cumulative-layout-shift-累计布局位移)
    - [其他指标](#fp-first-paint-首次绘制时间)
      - [首次绘制时间（FP）](#fp-first-paint-首次绘制时间)
      - [首次内容绘制时间（FCP）](#fcp-first-contentful-paint-首次内容绘制时间)
      - [长任务（LongTask）](#longtask-长任务)
      - [阶段耗时（Timing）](#timing-阶段耗时)
  - [业务埋点](#业务埋点)
    - [页面访问量（PV）](#page-view-页面访问量)
    - [自定义埋点](#自定义埋点)
- [指标配置项](#指标配置项)

## 简介

在前端系统中，通常异常是不可控的，并不能确定什么时候或者什么场景会发生异常，但它却会实实在在的影响用户体现。所以，我们非常有必要去做这样一件事情，就是去监控异常的发生并防范它。

不过有时候尽管没有异常发生，功能也正常，但是由于编码的问题导致运行十分缓慢，这就需要监控 web 应用的性能指标。

除此之外，去了解用户的行为，以用户数据为基础，来指导我们产品的优化方向，也是前端监控的重要课题之一。

所以前端监控主要可以分为三大类：数据监控、性能监控和异常监控。

## 如何消费

`microspot` 支持 CDN 和 ES Module 的方式使用，但是必须确保的是需要在所有资源之前引入。

### 支持 CDN 引入

打包之后会在 `es` 文件夹中生成 `index.global.js`，我们将它挂到 CDN 上通过路径引入，它会在 `window` 上定义一个 `microspot` 对象，通过对象上的 `set` 方法来配置监听项，通过 `start` 方法启动监听。

```html
<html>
  <head></head>
  <body>
    <script src="https://www.cdn.com/index.global.js"></script>
    <script>
      microspot.set({
        tracker: [
          'STABILITY',
          'EXPERIENCE',
          'BUSINESS'
        ],
        lastEvent: true,
        send: (spot) => {
          console.log('上传', spot)
        }
      });

      microspot.start(() => {
        console.log('启动监听');
      });
    </script>
  </body>
</html>
```

### 支持 ES Module

#### 安装

本模块通过 [npm][npm] 分发，需要将其添加到项目的 `dependencies` 中：

```
npm install microspot --save
```
或

通过 [yarn][yarn] 安装:
```
yarn add microspot
```

#### 使用

```ts
import { Microspot } from 'microspot';
const microspot = new Microspot();
microspot.set({
  tracker: [
    'STABILITY',
    'EXPERIENCE',
    'BUSINESS'
  ],
  lastEvent: true,
  send: (spot) => {
    console.log('上传', spot)
  }
});

microspot.start(() => {
   console.log('启动监听');
});
```

## 配置项

我们通过 `set` 方法可以传入监控配置，下面是具体的配置项：

### Config 定义

|字段|类型|默认值|描述|
|:-:|:-:|:----:|:--|
|**`tracker`**|`{Array<string\|TrackerOption>}`|`['STABILITY','EXPERIENCE','BUSINESS']`|需要监控的大类有：`STABILITY 稳定性`、`EXPERIENCE 体验`、`BUSINESS 业务`|
|**`lastEvent`**|`{boolean\|Array<string>}`|`true`|是否监听最后操作事件, 也可以通过事件数组指定监听的事件|
|**`send`**|`{(spot: SendSpot\|SendSpot[], options: DefaultIndexOption) => void}`|模块提供了 gif 上传方法|自定义埋点数据上传的方法，当埋点被触发时会调用该方法|

## 监控项

监控用户数据的上报格式，如下：


### 异常监控

#### 监控 JS 运行时异常

##### 配置

```js
{
  "tracker": [
    {
      "type": "STABILITY",
      "index": [
        {
          "type": "JS_RUNTIME_ERROR",
          /** 采样率 0-1， 比如 0.2，只有百分之 20 的埋点会被上传*/
          "sampling": 1,
          /** 缓存，会收集埋点数据批量上传 */
          // "buffer": 10
        },
      ]
    }
  ],
}
```

##### 埋点数据

```ts
interface Spot {
  type: string;
  env: { title: string; url: string; timestamp: number; userAgent: string; };
  subType: string;
  filename: string;
  message: string;
  position: string;
  stack: { at: string; scope: string; filename: string; lineno: string; colno: string; }[];
  selector: string;
}
```

#### 监控资源加载异常

##### 配置

|资源类型|对应字段|
|:-----:|:-----:|
|**`脚本`**|`SCRIPT_LOAD_ERROR`|
|**`样式`**|`CSS_LOAD_ERROR`|
|**`图像`**|`IMAGE_LOAD_ERROR`|
|**`音频`**|`AUDIO_LOAD_ERROR`|
|**`视频`**|`VIDEO_LOAD_ERROR`|

```js
{
  "tracker": [
    {
      "type": "STABILITY",
      "index": [
        {
          "type": "SCRIPT_LOAD_ERROR",
          /** 采样率 0-1， 比如 0.2，只有百分之 20 的埋点会被上传*/
          "sampling": 1,
          /** 缓存，会收集埋点数据批量上传 */
          // "buffer": 10
        },
      ]
    }
  ],
}
```

##### 埋点数据

```ts
interface Spot {
  type: string;
  env: { title: string; url: string; timestamp: number; userAgent: string; };
  subType: string;
  filename: string;
  tagName: string;
  selector: string;
}
```

#### 捕获拒绝未处理的 Promise

##### 配置

```js
{
  "tracker": [
    {
      "type": "STABILITY",
      "index": [
        {
          "type": "PROMISE_REJECTION",
          /** 采样率 0-1， 比如 0.2，只有百分之 20 的埋点会被上传*/
          "sampling": 1,
          /** 缓存，会收集埋点数据批量上传 */
          // "buffer": 10
        },
      ]
    }
  ],
}
```

##### 埋点数据

```ts
interface Spot {
  type: string;
  env: { title: string; url: string; timestamp: number; userAgent: string; };
  subType: string;
  message: string;
  filename: string;
  position: string;
  stack: { at: string; scope: string; filename: string; lineno: string; colno: string; }[];
  selector: string;
}
```

#### 白屏

##### 配置

```js
{
  "tracker": [
    {
      "type": "STABILITY",
      "index": [
        {
          "type": "BLANK_SCREEN",
          /** 采样率 0-1， 比如 0.2，只有百分之 20 的埋点会被上传*/
          "sampling": 1,
          /** 缓存，会收集埋点数据批量上传 */
          // "buffer": 10
        },
      ]
    }
  ],
}
```

##### 埋点数据

```ts
interface Spot {
  type: string;
  env: { title: string; url: string; timestamp: number; userAgent: string; };
  subType: string;
  emptyPoints: string;
  screen: string;
  viewPoint: string;
  selector: string[];
}
```

#### 监控 Ajax

##### 配置

```js
{
  "tracker": [
    {
      "type": "STABILITY",
      "index": [
        {
          "type": "XHR",
          /** 采样率 0-1， 比如 0.2，只有百分之 20 的埋点会被上传*/
          "sampling": 1,
          /** 缓存，会收集埋点数据批量上传 */
          // "buffer": 10,
          /** 接口白名单，名单中的接口不会进行打点 **/
          "apiWhiteList": [/^http:\/\/127.0.0.1:5500\/.+/],
          /** 监听的状态码列表 **/
          "statusList": [404, 405]
        },
      ]
    }
  ],
}
```

##### 埋点数据

```ts
interface Spot {
  type: string;
  env: { title: string; url: string; timestamp: number; userAgent: string; };
  subType: string;
  eventType: string;
  pathname: string;
  status: string;
  statusText: string;
  duration: string;
  response: string;
  params: string | Document | Blob | ArrayBufferView | ArrayBuffer | FormData;
}
```

#### 监控 Fetch

##### 配置

```js
{
  "tracker": [
    {
      "type": "STABILITY",
      "index": [
        {
          "type": "FETCH",
          /** 采样率 0-1， 比如 0.2，只有百分之 20 的埋点会被上传*/
          "sampling": 1,
          /** 缓存，会收集埋点数据批量上传 */
          // "buffer": 10,
          /** 接口白名单，名单中的接口不会进行打点 **/
          "apiWhiteList": [/^http:\/\/127.0.0.1:5500\/.+/],
          /** 监听的状态码列表 **/
          "statusList": [404, 405]
        },
      ]
    }
  ],
}
```

##### 埋点数据

```ts
interface Spot {
  type: string;
  env: { title: string; url: string; timestamp: number; userAgent: string; };
  subType: string;
  pathname: string;
  status: string;
  statusText: string;
  contentType: string;
  duration: string;
}
```

### 性能监控

Web 指标是 Google 开创的一项新计划，旨在为网络质量信号提供统一指导，这些信号对于提供出色的网络用户体验至关重要。

网站所有者要想了解他们提供给用户的体验质量，并非需要成为性能专家。Web 指标计划为了简化场景，帮助网站专注于最重要的指标，即 [核心 Web 指标（LCP FID CLS）][web-index]。

除此核心指标之外还有另外一些指标，如 FP、FCP、longTask、内存使用情况和阶段耗时等也是重要的指标。

#### LCP (Largest Contentful Paint) 最大内容绘制

##### 配置

```js
{
  "tracker": [
    {
      "type": "EXPERIENCE",
      "index": [
        {
          "type": "LARGEST_CONTENTFUL_PAINT",
          /** 采样率 0-1， 比如 0.2，只有百分之 20 的埋点会被上传*/
          "sampling": 1,
          /** 缓存，会收集埋点数据批量上传 */
          // "buffer": 10,
        },
      ]
    }
  ],
}
```

##### 埋点数据

```ts
interface Spot {
  type: string;
  env: { title: string; url: string; timestamp: number; userAgent: string; };
  subType: string;
  startTime: string;
  duration: string;
  selector: string;
  url: string;
}
```

#### FID (First Input Delay) 首次输入延迟

##### 配置

```js
{
  "tracker": [
    {
      "type": "EXPERIENCE",
      "index": [
        {
          "type": "FIRST_INPUT_DELAY",
          /** 采样率 0-1， 比如 0.2，只有百分之 20 的埋点会被上传*/
          "sampling": 1,
          /** 缓存，会收集埋点数据批量上传 */
          // "buffer": 10,
        },
      ]
    }
  ],
}
```

##### 埋点数据

```ts
interface Spot {
  type: string;
  env: { title: string; url: string; timestamp: number; userAgent: string; };
  subType: string;
  cancelable: string,
  processingStart: string,
  processingEnd: string,
  startTime: string;
  duration: string;
}
```

#### CLS (Cumulative Layout Shift) 累计布局位移

##### 配置

```js
{
  "tracker": [
    {
      "type": "EXPERIENCE",
      "index": [
        {
          "type": "CUMULATIVE_LAYOUT_SHIFT",
          /** 采样率 0-1， 比如 0.2，只有百分之 20 的埋点会被上传*/
          "sampling": 1,
          /** 缓存，会收集埋点数据批量上传 */
          // "buffer": 10,
        },
      ]
    }
  ],
}
```

##### 埋点数据

```ts
interface Spot {
  type: string;
  env: { title: string; url: string; timestamp: number; userAgent: string; };
  subType: string;
  value: string;
  sources: string[];
}
```

#### FP (First Paint) 首次绘制时间

##### 配置

```js
{
  "tracker": [
    {
      "type": "EXPERIENCE",
      "index": [
        {
          "type": "FIRST_PAINT",
          /** 采样率 0-1， 比如 0.2，只有百分之 20 的埋点会被上传*/
          "sampling": 1,
          /** 缓存，会收集埋点数据批量上传 */
          // "buffer": 10,
        },
      ]
    }
  ],
}
```

##### 埋点数据

```ts
interface Spot {
  type: string;
  env: { title: string; url: string; timestamp: number; userAgent: string; };
  subType: string;
  startTime: string;
  duration: string;
}
```

#### FCP (First Contentful Paint) 首次内容绘制时间 

##### 配置

```js
{
  "tracker": [
    {
      "type": "EXPERIENCE",
      "index": [
        {
          "type": "FIRST_CONTENTFUL_PAINT",
          /** 采样率 0-1， 比如 0.2，只有百分之 20 的埋点会被上传*/
          "sampling": 1,
          /** 缓存，会收集埋点数据批量上传 */
          // "buffer": 10,
        },
      ]
    }
  ],
}
```

##### 埋点数据

```ts
interface Spot {
  type: string;
  env: { title: string; url: string; timestamp: number; userAgent: string; };
  subType: string;
  startTime: string;
  duration: string;
}
```

#### LongTask 长任务

##### 配置

```js
{
  "tracker": [
    {
      "type": "EXPERIENCE",
      "index": [
        {
          "type": "LONG_TASK",
          /** 采样率 0-1， 比如 0.2，只有百分之 20 的埋点会被上传*/
          "sampling": 1,
          /** 缓存，会收集埋点数据批量上传 */
          // "buffer": 10,
          /** 长任务埋点设定时长，超过这个时长会进行打点，默认 200 毫秒 */
          "limitTime": 200
        },
      ]
    }
  ],
}
```

##### 埋点数据

```ts
interface Spot {
  type: string;
  env: { title: string; url: string; timestamp: number; userAgent: string; };
  subType: string;
  eventType: string;
  startTime: string;
  duration: string;
  selector: string;
}
```

#### Timing 阶段耗时

在 Web 应用中还有很多耗时的指标计算如下：

|名称|计算方法|描述|
|:-:|:-----:|:-:|
|**`loadTiming`**|`loadEventEnd - startTime`|`页面加载总耗时`|
|**`dnsTiming`**|`domainLookupEnd - domainLookupStart`|`DNS 解析耗时`|
|**`tcpTiming`**|`connectEnd - connectStart`|`TCP 连接耗时`|
|**`sslTiming`**|`connectEnd - secureConnectionStart`|`SSL 连接耗时`|
|**`requestTiming`**|`responseStart - requestStart`|`网路请求耗时`|
|**`responseTiming`**|`responseEnd - responseStart`|`数据请求耗时`|
|**`domTiming`**|`domContentLoadedEventEnd - responseEnd`|`DOM 解析耗时`|
|**`resourceTiming`**|`loadEventEnd - domContentLoadedEventEnd`|`资源加载耗时`|
|**`firstPacketTiming`**|`responseStart - startTime`|`首包耗时`|
|**`renderTiming`**|`loadEventEnd - responseEnd`|`页面渲染耗时`|
|**`htmlTiming`**|`responseEnd - startTime`|`HTML 加载完时间`|
|**`firstInteractiveTiming`**|`domInteractive - startTime`|`首次可交互时间`|

##### 配置

```js
{
  "tracker": [
    {
      "type": "EXPERIENCE",
      "index": [
        {
          "type": "TIMING",
          /** 采样率 0-1， 比如 0.2，只有百分之 20 的埋点会被上传*/
          "sampling": 1,
          /** 缓存，会收集埋点数据批量上传 */
          // "buffer": 10,
        },
      ]
    }
  ],
}
```

##### 埋点数据

```ts
interface Spot {
  type: string;
  env: { title: string; url: string; timestamp: number; userAgent: string; };
  subType: string;
  /** 性能元数据 */
  raw: PerformanceNavigationTiming;
  loadTiming: string;
  dnsTiming: string;
  tcpTiming: string;
  sslTiming: string;
  requestTiming: string;
  responseTiming: string;
  domTiming: string;
  resourceTiming: string;
  firstPacketTiming: string;
  renderTiming: string;
  htmlTiming: string;
  firstInteractiveTiming: string;
}
```

### 业务埋点

#### Page View 页面访问量

##### 配置

```js
{
  "tracker": [
    {
      "type": "BUSINESS",
      "index": [
        {
          "type": "PAGE_VIEW",
          /** 采样率 0-1， 比如 0.2，只有百分之 20 的埋点会被上传*/
          "sampling": 1,
          /** 缓存，会收集埋点数据批量上传 */
          // "buffer": 10,
        },
      ]
    }
  ],
}
```

##### 埋点数据

```ts
interface Spot {
  type: string;
  env: { title: string; url: string; timestamp: number; userAgent: string; };
  subType: string;
  href: string;
}
```

#### 自定义埋点

不管是 `CDN` 还是 `ES Module`，`microspot` 对象都会提供一个 send 方法，可以手动发送埋点数据，参数有两个：

- 拥有任意属性的自定义对象
- [指标配置项](#指标配置项)



```ts
import { Microspot } from 'microspot';
const microspot = new Microspot();
microspot.set(/** ... **/ );
microspot.start(/** ... **/);

/**
 * 第一个入参数是自定义的对象，不限制属性
 * 第二个入参数是指标配置项
 */
microspot.send(
  { type: '自定义 type', arg2: '自定义属性' }, 
  { sampling: 1, buffer: 10 }
);
```

## 指标配置项

从上面的配置中，应该已经大概了解，下面具体列举下：

|名称|适用的指标|描述|
|:-:|:-----:|:-:|
|**`type`**|`all`|`指标类型`|
|**`sampling`**|`all`|`采样率 0 - 1`|
|**`buffer`**|`all`|`缓冲发送`|
|**`routerMode`**|`PAGE_VIEW`|`路由模式`|
|**`apiWhiteList`**|`XHR, FETCH`|`请求域名白名单`|
|**`statusList`**|`XHR, FETCH`|`请求监听 status`|
|**`limitTime`**|`LONG_TASK`|`长任务埋点设定时长`|

[npm]: https://www.npmjs.com/
[yarn]: https://classic.yarnpkg.com
[build-badge]: https://img.shields.io/github/workflow/status/microspot/validate?logo=github&style=flat-square
[build]: https://github.com/Ruimve/microspot/actions/workflows/ci.yml/badge.svg
[coverage-badge]: https://img.shields.io/codecov/c/github/Ruimve/microspot.svg?style=flat-square
[coverage]: https://codecov.io/github/microspot
[version-badge]: https://img.shields.io/npm/v/microspot.svg?style=flat-square
[package]: https://www.npmjs.com/package/microspot
[downloads-badge]: https://img.shields.io/npm/dm/microspot.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/microspot
[license-badge]: https://img.shields.io/npm/l/microspot.svg?style=flat-square
[license]: https://github.com/Ruimve/microspot/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[github-watch-badge]: https://img.shields.io/github/watchers/Ruimve/microspot.svg?style=social
[github-watch]: https://github.com/Ruimve/microspot/watchers
[github-star-badge]: https://img.shields.io/github/stars/Ruimve/microspot.svg?style=social
[github-star]: https://github.com/Ruimve/microspot/stargazers

[web-index]: https://web.dev/i18n/zh/defining-core-web-vitals-thresholds/