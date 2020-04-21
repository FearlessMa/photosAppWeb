import { Action, Reducer, combineReducers } from "redux";
import { loginReducer } from 'src/pages/login/store';
import { menuState } from 'src/components/menu/store';
import { photoState } from 'src/pages/photos/store';
interface IMap {
  [name: string]: (state, action: MYAPP.DataAction) => void;
}
// class CreateReducerMap {
//   // let dataMap = {}
//   private dataMap: IMap = {};
//   private subscriptionList: any[] = [];
//   constructor(initValue: IMap = {}, subscriptionList = []) {
//     this.dataMap = initValue;
//     this.subscriptionList = subscriptionList;
//   }
//   register = (data: IMap) => {
//     this.dataMap = {
//       ...this.dataMap,
//       ...data
//     };
//     if (this.subscriptionList.length) {
//       this.notice();
//     }
//   };
//   getReducerMap = (): IMap => {
//     return this.dataMap;
//   };
//   subscribe = (fn: any): void => {
//     this.subscriptionList.push(fn);
//   };
//   notice = (): void => {
//     this.subscriptionList.forEach(item => {
//       item && item(this.dataMap);
//     });
//   };
// }

// const reducerMap = new CreateReducerMap({
//   AppNames: (state: any, action: any) => ({ name: "app" })
// });

// const registerReducer = reducerMap.register;
// 订阅 reducer 更新的方法
// const noticeFn = (data: IMap) => {
//   console.log('data:11111111 ', data);
//   // store = createStore(
//   //   combineReducers(data),
//   //   compose(applyMiddleware(sagaMiddleWare), devtools)
//   // );
// };
// reducerMap.subscribe(noticeFn);
// const rootReducer: Reducer = combineReducers(reducerMap.getReducerMap());
const rootReducer: Reducer = combineReducers({
  loginReducer,
  menuState,
  photoState
});

export { rootReducer };