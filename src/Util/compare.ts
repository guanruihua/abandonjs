import { isArray, isEmpty, isNumber, isRegExp, type } from 'asura-eye'
import { Val, Valer } from '../type'
import { toPathValue } from "./pathValue"
import { equal } from './equal'

/**
 * @title compareNumber
 * @param {number} val 被比较值
 * @param {number|string} valer 比较值 / 可为正则 / [number, number] / 字符串(=number,<=number...)
 * @returns {boolean}
 * @lastUpdate @3.2.0
 */
export function compareNumber(val: number, valer: Valer): boolean {

	const valType: string = type(val)
	const valerType: string = type(valer)

	if (valerType === 'RegExp') {
		return (valer as RegExp).test(String(val))
	}

	if (valType !== 'Number') {
		return false
	}

	if(val === valer){
		return true
	}

	if (isArray(valer) && valer.length > 0) {
		let min = -Infinity
		let max = Infinity

		if (!isEmpty(valer[0])) {
			min = Number(valer[0])
		}

		if (valer.length > 1 && !isEmpty(valer[1])) {
			max = Number(valer[1])
		}
		return val > min && val < max
	}


	if (valerType === 'String') {

		const [matNum, Sym = '=']: string[] = /(?<=([<>=!]+))[0-9]+/gi.exec(valer as string) || []

		switch (Sym) {
			case '=': return val === Number(matNum)
			case '>': return val > Number(matNum)
			case '>=': return val >= Number(matNum)
			case '<': return val < Number(matNum)
			case '<=': return val <= Number(matNum)
			case '<>':
			case '!=': return val != Number(matNum)
		}
	}

	return false
}


/**
 * @title compareValue
 * @param {Val} val 被比较值
 * @param {Valer} valer 比较值 / 可为正则
 * @param {string} [path] 值的路径 用逗号隔开
 * @returns {boolean}
 */
export function compareValue(val: Val | any, valer: Valer, path?: string): boolean {

	if (path) {
		val = toPathValue(val, path)
	}

	if (equal(val, valer)) return true

	if (isRegExp(valer)) return (valer as RegExp).test(String(val))

	if (isNumber(val)) return compareNumber(val as number, valer)
	if (isNumber(Number(val))) return compareNumber(Number(val), valer)

	return false
}
