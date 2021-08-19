import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { reducer as homeReducer } from '../containers/Home/store';
import clientAxios from '../client/request';
import serverAxios from '../server/request';
//合并项目组件中store的reducer
const reducer = combineReducers({
  home: homeReducer
})


/**
 * 这样在客户端和服务端的js文件引入时其实引入了一个函数，把这个函数执行就会拿到一个新的store,这样就能保证每个用户访问时都是用的一份新的store。
 */
//易错
export const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)));
}
export const getClientStore = () => {
  const defaultState = window.context ? window.context.state : {};
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)));
}


