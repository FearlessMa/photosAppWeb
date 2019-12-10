/// <reference path="../../node_modules/_redux@4.0.4@redux/index.d.ts"/> 

declare namespace MYAPP {
  interface IFetchData {
    get: (url: string, params: object, method: string) => Promise<any>,
    post: (url: string, params: object, method: string) => Promise<any>
  }
  interface DataAction {
    type: any,
    data: any
  }
}