//actions.js
import axios from 'axios';
import { CHANGE_LIST } from "./constants";

//普通action
const changeList = list => ({
  type: CHANGE_LIST,
  list
});
//异步操作的action(采用thunk中间件)
// export const getHomeList = (server) => {
//     return dispatch => {
//       //另外起的本地的后端服务
//       return axios.get('/api/news.json')
//         .then((res) => {
//           const list = res.data.data;
//           console.log('axios  list',list)
//           dispatch(changeList(list))
//         }).catch((e)=>{
//             console.log('axios shibai',e)
//         })
//     }
//   }
//参数从store、index中来的  applyMiddleware(thunk.withExtraArgument(clientAxios)
  export const getHomeList = (server) => {
    return (dispatch, getState, axiosInstance) => {
      return axiosInstance.get('/api/news.json')
        .then((res) => {
          const list = res.data.data
          console.log('axios  list',list)
          dispatch(changeList(list))
        });
    };
  };
