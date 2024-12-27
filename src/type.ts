export * from '0type'

export type Itteratee = string | ((val: any) => any)

export type Predicate = any[] | ((val: any) => any) | ObjectType<any> | string | undefined

export type AnyFunction = (...arg: any) => any
export type Func<Params extends unknown[], Result = void> = (...args: Params) => Result
export type AnyAsyncFunction = (...args: any[]) => Promise<any>
export type AsyncFunc<T extends [], U> = (...arg: T) => Promise<U>

export type NoParamFn<Result> = () => Result
export type OneParamFn<Param, Result> = (value: Param) => Result

/**
 * @description 任意对象类型
 */
export type ObjectType<Value = unknown> = Record<string, Value>
export type MapType<Value = unknown> = Map<string | number, Value>
export type SetType<Value = unknown> = Set<Value>

export type ValBase = undefined | null | number | string | boolean | ValBase[] | {
	[key: string]: ValBase
}
export type Val = ValBase

export type ValerBase = number | string | boolean | RegExp
export type Valer = ValerBase | ValBase[] | [
	undefined | string | number,
	undefined | string | number
] | {
	[key: string]: Valer
}