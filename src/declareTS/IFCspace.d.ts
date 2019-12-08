declare namespace IFCspace {
  interface IFC {
    (data: any): React.ReactElement
  }
}
declare namespace MyApp {
  interface IFetchData {
    get: (url: string, params: object, method: string) => Promise<any>,
    post: (url: string, params: object, method: string) => Promise<any>
  }
}