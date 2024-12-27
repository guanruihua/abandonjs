import { isFunction } from "asura-eye"

/**
 * @title fill<T>
 * @description 在原有数组上改变, 修改指定位置的值
 * @param {T[]} array 待填充改变的数组
 * @param {T|(index:number)=>T} value 填充值
 * @param {number} [num=0] 填充个数
 * @returns
 */
export function fill<T>(
  array: T[],
  value: T | ((index: number) => T),
  num: number = 0,
): T[] {
  while (num--) {
    array.push(
      isFunction(value)
        ? value(array.length)
        : value
    )
  }
  return array
}