import { isNumber, isObject, isString, isUndefined } from 'asura-eye'
import { PathConf, PathConfObject } from './type'

export const getConf = (conf?: PathConf): PathConfObject & { gap: string } => {
  if (isString(conf) || isNumber(conf)) return { path: conf, gap: '.' }
  if (isObject(conf)) {
    if (isUndefined(conf.gap)) conf.gap = '.'
    return conf as PathConfObject & { gap: string }
  }
  return { gap: '.' }
}
