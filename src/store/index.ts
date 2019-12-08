import { createStore, Store, applyMiddleware, compose } from 'redux';
import { reducer } from './reducer';
import { rootSagas } from './sagas';
import createSagaMiddleware from 'redux-saga'
import { register } from './sagas';
export { register }
// process.env
console.log('process.env: ', process.env.NODE_ENV);

const sagaMiddleWare = createSagaMiddleware();

const w: any = window as any;
let devtools: any = w.__REDUX_DEVTOOLS_EXTENSION__ ? w.__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f;
const store: Store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleWare),
    devtools
  )
)

sagaMiddleWare.run(rootSagas);

// const middleware = [];
// let storeEnhancer = [];
// if (process.env.NODE_ENV === 'production') {
//   middleware.push(sagas);
//   storeEnhancer = applyMiddleware(...middleware);
// }
// if (process.env.NODE_ENV === 'development') {
//   middleware.push(sagas, logger);
//   storeEnhancer = compose(
//     applyMiddleware(...middleware),
//     devtools
//   );
// }
// const store = createStore(reducer, storeEnhancer);


export default store

