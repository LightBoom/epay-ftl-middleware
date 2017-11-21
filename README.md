# epay-ftl-middleware

epay-ftl-middleware可作为中间件，能够渲染多个ftl项目，每个ftl项目可拥有自己独立的视图目录（include等指令以此路径为根）

## 功能

1、渲染多个ftl项目
2、ajax可以以视图路径为基准取到mock文件，格式支持js、json，html文件可直接返回

## 安装

```
$ npm install --save-dev epay-ftl-middleware

```

## 参数

* **router** - {object}

  指定各项目对应**server访问路径**与**ftl视图路径**之间的映射
  ``` javascript
  var router = {
      // 注意路径需要以“/”结尾，不要用跟base第一截相同的路径名
      // 若指定某个项目为跟路径“/”，则必须指定routePath属性为“/name”的形式
      '/project_a/': {
          name: 'a项目',
          // 视图基准路径视图视图基准路径路径，注意路径需要以“/”结尾，
          base: '/epay_project_a/src/main/webapp/WEB-INF/ftl/'
      },
      '/': {
          name: 'b项目',
          routePath: '/epayweb',
          base: '/epay_project_b/src/main/webapp/WEB-INF/ftl/'
      }
  };

  ```

* **filterFiles** - {function}  @params：req, files{array}

  读取的文件夹列表过滤规则，默认会在文件夹下所有文件路径中加入‘../’，在访问路径“／”时，会展示出所有项目。
  **如需自定义规则，可传入**

* **filterMap** - {object}

  可直接粗暴指定某**真实路径**对应读取的文件夹路径列表
  ``` javascript
  {
    '/epay_project_a/src/main/webapp/WEB-INF/ftl/': ['file.html', 'dir/', '../', {
      href: '../../',
      text: '上上级别'
    }]
  }

  ```

## example
``` javascript
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var port = 9000;
var ftlMiddleWare = require('epay-ftl-middleware');

var router = {
  '/project_a/': {
    name: 'a项目',
    base: '/epay_project_a/src/main/webapp/WEB-INF/ftl/'
  },
  '/project_b/': {
    name: 'b项目',
    base: '/epay_project_b/src/main/webapp/WEB-INF/ftl/'
  },
  '/': {
    name: '主项目',
    routePath: '/epayweb',
    base: '/epay_project_main/src/main/webapp/WEB-INF/ftl/'
  }
};

app.use('/cdnStaticSource20151123', express.static('cdnStaticSource20151123'));
app.use(ftlMiddleWare({
    router: router
}));

app.listen(port);
setTimeout(function () {
  console.log('> server start at localhost:' + port)
});

```

## License

The MIT License (MIT)