import { put, call, takeEvery, take, takeLatest, all, PutEffect, CallEffect, TakeEffect, AllEffect } from 'redux-saga/effects';
import { Action } from "redux";
import { fetchData } from "src/server";
import { camelToUnderline } from 'utils';
import * as actionTypes from './actionTypes'
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
  all<T>(effects: T[]): AllEffect<T>
}



// 使用symbol 生成私有变量key
const dataKey: symbol = Symbol('data');

/**
 * 批量处理 saga 
 *
 * @class MapGeneratorToSagas
 * @implements {TranSagas}
 */
class MapGeneratorToSagas implements TranSagas {
  private dataKey: IData
  constructor(data: IData = {}) {
    this[dataKey] = data
  }
  /**
   *  sagas 注册到 私有对象中 格式{ActionType:generator}
   *
   * @param {object} params
   * @returns {void}
   * @memberof MapGeneratorToSagas
   */
  register(params: object): void {
    const type = Object.prototype.toString.call(params);
    if (type === '[object Object]') {
      this[dataKey] = {
        ...(this[dataKey]),
        ...params
      }
    } else if (type === '[object Module]') {
      Object.values(params).forEach(item => {
        this[dataKey] = {
          ...(this[dataKey]),
          ...item
        }
      })
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
    const effect: myEffect = { put, call, takeEvery, take, takeLatest, all, fetchData }
    return fn.bind(null, effect)
  }


  /**
   *
   *  生成有takeEvery组成的list [takeEvery(Action,generator),...]
   * @returns {any[]}
   * @memberof MapGeneratorToSagas
   */
  getList(): any[] {
    const dataList = Object.entries(this[dataKey]);
    console.log('dataList: ', dataList);
    const list: Array<any> = [];
    dataList.forEach(item => {
      const [k, v] = item;
      if (typeof v === 'function') {
        // 驼峰转下划线
        const key = camelToUnderline(k);
        list.push(takeEvery(actionTypes[key], this.insertEffect(v)));
      }
    })
    return list;
  }
}

const toSagas = new MapGeneratorToSagas();


// 导出注入函数
export const register = toSagas.register.bind(toSagas);

// 生成 注册sagas 
export function* rootSagas() {
  const list = toSagas.getList();
  console.log('list: ', list);
  yield all(list)
}