import express from 'express';
// import React from 'react';
// import ReactDom from 'react-dom';
// import { renderToString } from 'react-dom/server';
import {render} from './utils';
import routes from '../routes'
import proxy from 'express-http-proxy';
import { matchRoutes } from 'react-router-config';
import { getStore } from '../store';


const app = express();
//将静态文件目录设置为：项目根目录+/public
app.use(express.static('public'));
//设置代理解决跨域问题
app.use('/api', proxy('http://localhost:4000', {
  proxyReqPathResolver: function(req) {
    return '/api'+req.url
  }
}));

//注意这里要换成*来匹配
app.get('*', function (req, res) {
      const store = getStore();
      //调用matchRoutes用来匹配当前路由(支持多级路由)
      const matchedRoutes = matchRoutes(routes, req.path)
      //promise对象数组
      const promises = [];
      matchedRoutes.forEach(item => {
          //如果这个路由对应的组件有loadData方法
          if (item.route.loadData) {
            //那么就执行一次,并将store传进去
            //注意loadData函数调用后需要返回Promise对象
            const promise = new Promise((resolve, reject) => {
              item.route.loadData(store).then(resolve).catch(resolve);
            })
            promises.push(promise);
          }
      })
      Promise.all(promises).then(() => {
          //此时该有的数据都已经到store里面去了
          //执行渲染的过程(res.send操作)
          const html = render(store, routes, req);
          console.log('promsie===>render html',html)
          res.send(html);
        
        }
      ).catch((e)=>{
        console.log('promise  err',e)
      }) 
});

app.listen(3001, () => {
  console.log('listen:3001')
})
