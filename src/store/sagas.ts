import { put, call, takeEvery, take, takeLatest, all, PutEffect, CallEffect, TakeEffect, AllEffect } from 'redux-saga/effects';
import { Action } from "redux";
import { fetchData } from "src/server";
import { camelToUnderline } from 'utils';
import * as actionTypes from './actionTypes';
import { sagaMiddleWare } from './index';
import { notification } from 'antd';

const notice = (type: string, message: string, description: string) => {
  notification[type]({
    message,
    description
  });
};
interface IData {
  [name: string]: any
}
interface TranSagas {
  //注册功能
  register: (p: any) => any
}

interface myEffect {
  fetchData: MYAPP.IFetchData,
  put<A extends Action>(action: A): PutEffect<A>,
  call<A extends Action>(action: A): CallEffect<A>,
  take<A extends Action>(action: A): TakeEffect,
  takeEvery: any,
  takeLatest: any,
  all<T>(effects: T[]): AllEffect<T>,
  notice: (type: string, message: string, description: string) => void,
}

type subscribeFun = () => void


// 使用symbol 生成私有变量key
// const dataKey: symbol = Symbol('data');

/**
 * 批量处理 saga 
 *
 * @class MapGeneratorToSagas
 * @implements {TranSagas}
 */
class MapGeneratorToSagas implements TranSagas {
  private dataKey: IData = {}
  private historyDataKey: IData = {};
  private subscriptionList: subscribeFun[] = []
  constructor(data: IData = {}, list = [], historyDataKey: IData = {}) {
    this.dataKey = data
    this.subscriptionList = list;
    this.historyDataKey = historyDataKey;
  }
  /**
   *  sagas 注册到 私有对象中 格式{ActionType:generator}
   *
   * @param {object} params
   * @returns {void}
   * @memberof MapGeneratorToSagas
   */
  register(params: object): void {
    this.dataKey = {};
    const newDataKey = {};
    const type = Object.prototype.toString.call(params);
    if (type === '[object Object]') {
      Object.entries(params).forEach(([key, value]) => {
        if (!this.historyDataKey[key]) {
          newDataKey[key] = value;
        }
      })
    } else if (type === '[object Module]') {
      Object.entries(params).forEach(([key, value]) => {
        if (!this.historyDataKey[key]) {
          newDataKey[key] = value;
        }
      })
    }
    if (Object.keys(newDataKey).length) {
      this.dataKey = { ...newDataKey };
      this.notice()
    }
  }
  /**
   *
   * 注入 effect 方法 绑定参数 { put, call, takeEvery, take, takeLatest, all, fetchData }等
   * @param {*} fn generator 函数 
   * @returns {GeneratorFunction} 
   * @memberof MapGeneratorToSagas
   */
  insertEffect(fn): GeneratorFunction {
    const effect: myEffect = { put, call, takeEvery, take, takeLatest, all, fetchData, notice }
    return fn.bind(null, effect)
  }


  /**
   *
   *  生成有takeEvery组成的list [takeEvery(Action,generator),...]
   * @returns {any[]}
   * @memberof MapGeneratorToSagas
   */
  getList(): any[] {
    const dataList = Object.entries(this.dataKey);
    const list: Array<any> = [];
    dataList.forEach(([k, v]) => {
      if (typeof v === 'function' && !this.historyDataKey[k]) {
        // 驼峰转下划线
        // const key = camelToUnderline(k);
        // 获取type 的 symbol 
        // const actionTpe = actionTypes[key];
        list.push(takeEvery(k, this.insertEffect(v)));
        this.historyDataKey[k] = k;
      }
    })
    return list;
  }
  // 订阅
  subscribe(fn: subscribeFun) {
    if (Object.prototype.toString.call(fn) !== '[object Function]') throw new Error('fn is not function');
    this.subscriptionList.push(fn)
  }
  // 通知
  notice() {
    this.subscriptionList.forEach(item => {
      item()
    })
  }
}

const toSagas = new MapGeneratorToSagas();


// 导出注入函数
export const registerSaga = toSagas.register.bind(toSagas);

// 生成 注册sagas 
export function* rootSagas() {
  let list = toSagas.getList();
  console.log('list: ', list);
  // 发布订阅
  toSagas.subscribe(() => {
    sagaMiddleWare.run(rootSagas)
  })
  yield all(list);

}