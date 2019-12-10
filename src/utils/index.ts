
/**
 *  驼峰命名转下划线命名
 *
 * @param {string} CamelName 
 * @returns {string} UnderlineName
 */
const camelToUnderline = (CamelName: string): string => CamelName.replace(/([A-Z])/g, "_$1").toUpperCase();



export {
  camelToUnderline
}