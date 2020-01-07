
/**
 *  驼峰命名转下划线命名
 *
 * @param {string} CamelName 
 * @returns {string} UnderlineName
 */
const camelToUnderline = (CamelName: string): string => CamelName.replace(/([A-Z])/g, "_$1").toUpperCase();

const cookiesUtils = {
  getCookie: (key: string): string => {
    let cookieStr = document.cookie;
    if (!cookieStr) return '';
    let value = '';
    let cookiesList = cookieStr.split(';');
    cookiesList.forEach(item => {
      const [k, v] = item.split('=');
      if (key == k) {
        value = v;
      }
    })
    return value;
  },
  setCookie: (key: string, value: string): boolean => {
    if (typeof key === "string" && typeof value === "string") {
      document.cookie = key + '=' + value;
      return true;
    }
    return false;
  }
}

const sessionStorageUtils = {
  getItem: (key: string): Object | '' => {
    const str = sessionStorage.getItem(key);
    return typeof str == 'string' ? JSON.parse(str) : "";
  },
  setItem: (key: string, value?: any): void => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  clearItem: (key: string): void => {
    sessionStorageUtils.setItem(key, '')
  }
}

export {
  camelToUnderline,
  cookiesUtils,
  sessionStorageUtils
}