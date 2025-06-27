### 0. 环境要求参考（依赖不报错即可根据项目修改）

- Node.js 18.19.0
- npm 10.9.0
- pnpm 9.7.0

### 1. 安装依赖

```bash
npm install & pnpm install

```

### 2. 启动项目

```bash
npm run dev & pnpm dev
```

### 3. 打包项目

```bash
npm run build & pnpm build
```

### 5. 项目介绍

- 本项目是基于Vben Admin的后台管理系统做的改造，文件结构目录参考Vben Admin，但是代码逻辑有所不同。
- 项目主要整理为适应于官网门户开发，如发现有不适模块可以联系作者，或者做自行移除。

### 6.项目基础配置和部分目录介绍

- utils/http 使用vueuse封装的接口请求，axios只是引入，未作封装
- store 使用pinia做状态管理，线上对数据做了加密处理，开发环境未做处理
- hook 如有经常使用的hooks，可以自行封装，可以放在目录下与同事一起分享
- unocss 原子化css，根据个人喜好，可以自行选择是否使用


### 7.常用工具及部分常用函数介绍
- useApiBasic 仅进行接口调用并无特殊数据处理时，可使用此函数，函数进行简单成功，失败返回处理
- utils/options/basicOptions.tsx 静态状态管理文件
- utils/options/useBasicOptions.tsx 异步状态管理文件
- components/skeleton 为异步资源加载等待组件，模块优化时可优先考虑使用