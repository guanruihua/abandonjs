import { ObjectType } from '0type'
import { isNumber } from 'asura-eye'
import { PathConf } from './type'
import { getConf } from './util'

/**
 * @title pathObject2Object
 * @description 根据路径获取值
 * @param { ObjectType } record 数据
 * @param { PathConf } [conf] 
 * @returns { ObjectType }
{
  "a.b.c": 1,
  "a.e.0": 3,
  "a.e.1": 4
}
=>
{
a: {
  b: {
    c: 1
  },
    e: [3, 4]
  }
}
 */
export function pathObject2Object(
  record: ObjectType<any>,
  conf?: PathConf,
): ObjectType {
  const result: ObjectType = {}

  const { gap = '.' } = getConf(conf)

  const init = (keys: string[], value: any, record: ObjectType<any>) => {
    if (keys.length === 1) record[keys[0]] = value
    if (keys.length > 1) {
      const [key, ...restKey] = keys
      if (!record[key]) record[key] = {}
      init(restKey, value, record[key])
      if (Object.keys(record[key]).filter((n) => isNumber(Number(n))).length) {
        const tmp = []
        for (const i in record[key]) tmp[i] = record[key][i]
        record[key] = tmp
      }
    }
  }

  for (const key in record) init(key.split(gap), record[key], result)
  return result
}

// const record = {
//   'a.b.c': 1,
//   'a.e.0': 3,
//   'a.e.1': 4,
// }
// const record2 = {
//   a_$$_b_$$_c: 11,
//   a_$$_e_$$_0: 31,
//   a_$$_e_$$_1: 41,
// }
// console.log(
//   '\n',
//   pathObject2Object(record),
//   '\n',
//   pathObject2Object(record2, { gap: '_$$_' }),
//   '\n',
// )
