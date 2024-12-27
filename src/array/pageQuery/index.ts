import { isEffectArray, isEffectObject, isEmpty, isFunction, isNumber, isObject, isString, likeNumber } from "asura-eye"
import { type ObjectType } from "../../type"
import { stringify, vid } from "../../string"
import type { Pagination, PageQueryProps, DataSourceConfig } from './type'
import { descSort, ascSort } from '../sort'
import { equal } from '../../util'

/**
 * @title pageQuery
 * @description 对数组进行分页查询以及管理
 * @param {PageQueryProps} props 
 * @returns 
 */
export function pageQuery(originDataSource: ObjectType[] = [], props: PageQueryProps = {}) {
  const {
    uniqueIndex = 'id',
    noRangeFields,
    keepFields,
    handleValue,
    fields,
  } = props

  // 原始数据
  let dataSource = [...originDataSource]

  const getValue = (record: ObjectType, key: string) => {
    let value = record[key]
    if (fields && isFunction(fields[key])) {
      return fields[key](value, key)
    } else if (handleValue) {
      return handleValue(value, key)
    }

    if (isEmpty(value)) return ''
    if(isEffectArray(keepFields) && keepFields.includes(key)){
      return value
    }
    if (isString(value)) {
      return value.trim().toUpperCase()
    }

    if (isNumber(value)) {
      return stringify(value)
    }

    return value
  }

  const isEqual = (item: ObjectType, params: ObjectType, key: string): boolean => {
    const value = getValue(item, key)
    const beValue = getValue(params, key)

    if (
      !(
        isEffectArray(noRangeFields) &&
        noRangeFields.includes(key)
      ) &&
      likeNumber(value) &&
      isEffectArray(beValue) &&
      beValue.length === 2
    ) {
      const [min, max] = beValue
      if (likeNumber(min) && likeNumber(max)) {
        return Number(value) >= Number(min) &&
          Number(value) <= Number(max)
      }
      return false
    }

    if (isString(value) && isString(beValue)) {
      return value.indexOf(beValue) > -1
    }

    return equal(value, beValue)
  }

  const getDataSource = (params?: ObjectType, config?: DataSourceConfig) => {
    let newDataSource = [...dataSource]
    if (isEffectObject(config)) {
      const { sortBy } = config
      if (isEffectObject(sortBy)) {
        for (const key in sortBy) {
          const sortIndex = sortBy[key]
          if (sortIndex === 'desc') {
            newDataSource = descSort(newDataSource, key)
          }
          if (sortIndex === 'asc') {
            newDataSource = ascSort(newDataSource, key)
          }
        }
      }
    }
    if (isEffectObject(params)) {
      newDataSource = newDataSource.filter(item => {
        for (let key in params) {
          if (!isEqual(item, params, key)) return false
        }
        return true
      })
    }
    return newDataSource
  }

  /**
   * @title getPage
   * @description 获取分页数据
   * 1,params[key]. 若值为[number, number], 且被查询值为数字或数字字符串, [number, number]当做范围, 若不想这样子指定, 需要在 pageQuery 指定
   * @param {Object} params 查询条件
   * @param {Pagination} pagination 分页信息
   * @returns {dataSource: DataSource, pagination: Pagination}
   */
  const getPage = (
    params?: ObjectType,
    pagination: Partial<Pagination> = {}
  ) => {
    const { current = 1, pageSize = 10, sortBy } = pagination

    const newDataSource = getDataSource(params, { sortBy })

    return {
      dataSource: newDataSource.slice((current - 1) * pageSize, current * pageSize),
      pagination: {
        current,
        pageSize,
        total: newDataSource.length
      }
    }
  }

  const del = (indexes: string | string[]) => {
    if (isEffectArray<string>(indexes)) {
      dataSource = getDataSource()
        .filter(item => !indexes.includes(item[uniqueIndex] as string))
      return
    }
    if (isString(indexes)) {
      dataSource = getDataSource()
        .filter(item => item[uniqueIndex] !== indexes)
      return
    }
  }
  const add = (record: ObjectType | ObjectType[]) => {
    if (isObject(record)) {
      if (isEmpty(record[uniqueIndex])) {
        record[uniqueIndex] = '__vid__' + vid()
      }
      dataSource.unshift(record)
      return
    }
    if (isEffectArray(record)) {
      record.forEach(add)
      return
    }
  }

  return {
    dataSource,
    getPage,
    getDataSource,
    del,
    add,
  }
}