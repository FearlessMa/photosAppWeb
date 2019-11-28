import { createStore, Store } from 'redux';
import { reducer } from './reducer';

const w: any = window as any;
let devtools: any = w.__REDUX_DEVTOOLS_EXTENSION__ ? w.__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f;
const store: Store = createStore(
  reducer,
  devtools
)

export default store

// import { applyMiddleware, createStore } from 'redux';

// import rootReducer from './reducers/root';

// import thunk from 'redux-thunk';

// const w : any = window as any;
// const devtools: any = w.devToolsExtension ? w.devToolsExtension() : (f:any)=>f;
// const middleware = applyMiddleware(thunk);
// const store: any = middleware(devtools(createStore))(rootReducer);

// export default store;