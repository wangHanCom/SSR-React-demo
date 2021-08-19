// import routes from '../routes'
import { renderToString } from 'react-dom/server';
//重要是要用到StaticRouter
import { StaticRouter,Route } from 'react-router-dom'; 
import React from 'react'
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
//易错  renderRoutes
export const render = (store, routes, req) => {
  //构建服务端的路由
  const content = renderToString(
    <Provider store={store}>
        <StaticRouter location={req.path} >
        <div>
          {renderRoutes(routes)}
        </div>
    
        </StaticRouter>
    </Provider>
  );
  console.log('req.path',req.path)
  console.log('content',content)
  return `
    <html>
      <head>
        <title>ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/index.js"></script>
        <script>
  window.context = {
    state: ${JSON.stringify(store.getState())}
  }
</script>
      </body>
    </html>
  `
}
