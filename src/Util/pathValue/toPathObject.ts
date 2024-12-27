import { isEffectArray, isEffectObject } from 'asura-eye'
import type { ObjectType } from '0type'
import { getConf } from './util';
import { PathConf } from './type';

/**
 * @title toPathObject
 * @param {ObjectType} record 
 * @param {PathConf} [conf]
 * @returns {ObjectType}
{
a: {
  b: {
    c: 1
  },
    e: [3, 4]
  }
}
=>
{
  "a.b.c": 1,
  "a.e.0": 3,
  "a.e.1": 4
}
 */
export function toPathObject(
  record: ObjectType,
  conf?: PathConf,
): ObjectType {
  const result: ObjectType = {}
  const { ignoreArray = false, gap = '.' } = getConf(conf)
  const cb = (record: ObjectType | ObjectType[], index: string = '') => {
    if (ignoreArray && isEffectArray(record)) {
      return
    }
    if (isEffectObject(record) || isEffectArray(record)) {
      for (const key in record)
        cb(record[key], index === '' ? key : index + gap + key)
    } else if (index !== '') {
      result[index] = record
    }
  }
  cb(record, '')
  return result
}

// const obj = {
//   a: {
//     b: {
//       c: 1,
//     },
//     e: [3, 4],
//   },
// }
// const val = toPathObject(obj, {
//   gap: '$$',
// })
// console.log(val)
