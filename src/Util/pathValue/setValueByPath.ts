import { ObjectType } from '0type'
import { isNumber, isString } from 'asura-eye'
import { PathConf } from './type'
import { getConf } from './util'

/**
 * @title setPathKeyValue
 * @description 根据 pathKey 设置 值
 * @param {ObjectType} record
 * @param {PathConf} conf
 * @param {any} value
 */
export function setValueByPath(
  record: ObjectType,
  conf: PathConf,
  value: any,
): void {
  const { path, gap } = getConf(conf)
  const cb = (obj: ObjectType<any>, keys: string[]) => {
    const [key, ...restKeys] = keys
    try {
      if (!obj[key]) {
        if (isNumber(Number(key))) {
          obj[key] = []
        } else {
          obj[key] = {}
        }
      }
      if (restKeys.length) {
        cb(obj[key], restKeys)
        return
      }
      obj[key] = value
    } catch (error) {
      console.error(error)
    }
  }
  if (isString(path)) {
    cb(record, path.split(gap))
  } else if (isNumber(path)) {
    cb(record, [path.toString()])
  }
}
/**
 * eg: 
{
  "a": {
    "b": {
      "c": 5,
      "d": {
        "e": {
          "f": 7
        }
      }
    },
    "e": [
      3,
      4
    ]
  }
}
 */

// const tmp = {
//   a: {
//     b: {
//       c: 1
//     },
//     e: [3, 4]
//   }
// }

// setValueByPath(tmp, 'a.b.c', 5)
// setValueByPath(tmp, 'a.b.d.e.f', 7)
// console.log(tmp)
