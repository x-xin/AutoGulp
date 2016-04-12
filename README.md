# AutoGulp

AutoGulp is a template for the front-end automation, created by Roda, and maintained by the core team with the massive support and involvement of the community.

## Table of contents

* [Auto function](#auto-function)
* [What's included](#what-is-included)
* [Less section](#less-section)
* [JavaScript section](#javascript-section)
* [Other](#other)

## Auto function

*  LESS 编译、压缩 
*  JavaScript 纠错、合并、压缩 
*  图片压缩、雪碧图（PNG / JPG） 
*  缓存、清除 
*  其他、待完善 

### What's included

Within the download you'll find the following directories and files.
You'll see something like this:

```
AutoGulp/
├── wap/
│   ├── dest/
│   │   ├── css/                      
│   │   │   └── styles.css                                 // 最终样式
│   │   ├── img/                                           // 存放图片
│   │   └── js/
│   │       └── all.js                                     // 最终脚本
│   ├── dev/
│   │   ├── img/
│   │   │   ├── default/                                   // 默认合并图片
│   │   │   └── sprite/                                    // 雪碧图集合
│   │   ├── js/                                            // 脚本目录
│   │   │   ├── ajax.js 
│   │   │   ├── jsBridge.js 
│   │   │   ├── metareset.js 
│   │   │   └── template.js
│   │   └── less/
│   │       ├── app/
│   │       │   ├── mod/                                   // 模块目录
│   │       │   │   └── mod-progress.less 
│   │       │   ├── page/ 
│   │       │   │   └── page-simple-index.less             // 页面用户定义
│   │       │   ├── layout.less                            // 页面布局样式    
│   │       │   ├── mod.less                               // 模块样式入口
│   │       │   └── page.less                              // 页面样式入口
│   │       ├── core/
│   │       │   ├── handlebarsStr.css.handlebars
│   │       │   ├── icon.less                              // icon 样式
│   │       │   ├── sprite-jpg.css
│   │       │   ├── sprite-png.css                         // 雪碧图样式
│   │       │   ├── ui-btn.less 
│   │       │   ├── ui-floatCenter.less 
│   │       │   ├── ui-forms.less 
│   │       │   └── ui-pagination.less
│   │       ├── lib/
│   │       │   ├── base.less                              // 基础样式
│   │       │   ├── color.less                             // 全局颜色
│   │       │   └── mixins.less                            // 通用函数
│   │       └── styles.less                                // 全局入口
│   ├── node_modules/
│   ├── gulpfile.js                                        // 任务文件
│   ├── package.json                                       // 依赖模块
│   └── run.bat
├── example/
│   └── index.html
├── Readme.md
└── run.bat

```

## Less section

*   `ly-` 前缀：通用布局，如 `.ly-right”` 

*   `.mod-/#mod-` 前缀：通用模块，如 `.mod-search` ，`.mod-search-more`
    *  一个模块一个LESS文件
    *  继承模块写在对应的模块下面
    *  模块与模块在页面上禁止嵌套
    
*   `.fn-` 前缀：常用功能样式，目前就提供 `.fn-left` 、 `.fn-right` 、 `.fn-clear` 、 `.fn-hide` 四种样式，只在LESS内调用，页面内禁用

*   `.icon-` 前缀：图标样式，如 `.icon-edit` 、 `.icon-error` 

*   `.page-` 前缀：页面级样式，如 `.page-index` 

*   `.ui-` 前缀：
    *  表单样式：分为 `.ui-input` 、 `.ui-radio` 、 `.ui-checkbox` 、 `.ui-textarea` 、 `.ui-select` 、 `.ui-label` 、 `.ui-label-radio` 、 `.ui-label-checkbox`
    
    *  按钮样式：基本型是定大小宽度等，扩展型是搭配一个基本型使用
        *  基本型：`ui-btn-small` 、 `ui-btn` ， `ui-btn-big` ， `ui-btn-largeBig`
        *  扩展型：`ui-btn-cancel` 、 `ui-btn-disable` 、 `ui-btn-gray` 、 `ui-btn-blue`

## JavaScript section

*   ` l- ` 前缀：JS控件，如` .l-grid` 、 `.l-tree` 

*   ` j- ` 前缀：页面上的js交互标示，如 `.j-submit` 

## Other
Thank you for your support and guidance.
