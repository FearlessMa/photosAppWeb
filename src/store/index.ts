import { createStore, Store, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducer";
import { rootSagas } from "./sagas";
import createSagaMiddleware from "redux-saga";
import { registerSaga } from "./sagas";
// process.env console.log('process.env: ', process.env.NODE_ENV);
interface IMap {
  [name: string]: (state, action: MYAPP.DataAction) => void;
}

const sagaMiddleWare = createSagaMiddleware();
const w: any = window as any;
let devtools: any = w.__REDUX_DEVTOOLS_EXTENSION__
  ? w.__REDUX_DEVTOOLS_EXTENSION__()
  : (f: any) => f;
let store: Store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleWare), devtools)
);


sagaMiddleWare.run(rootSagas);

export default store;

export { registerSaga, sagaMiddleWare };
