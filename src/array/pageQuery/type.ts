import { type ObjectType } from "../../type"

export type Pagination = {
	pageSize: number
	pageNo: number
  total?: number
}

type Field = {
		/**
	 * @description 模糊查询(包含不区分大小写, 去除前后空格, 优先级比单独指定低)
	 * @default true
	 */
	fuzzyQuery?: boolean
	/**
	 * @description 数字类型模糊查询(包含不区分大小写, 去除前后空格, 优先级比单独指定低)
	 * @default false
	 */
	numberFuzzyQuery?: boolean
  /**
   * @description 类型比对
   */
  handle?(value:any, beValue: any):boolean
}

export interface PageQueryProps {
	/**
	 * @description 待处理数组
	 */
	dataSource?: ObjectType[]
  /**
   * @description 唯一索引
   * @default 'id'
   */
  uniqueIndex?: string
	/**
	 * @description 模糊查询(包含不区分大小写, 去除前后空格, 优先级比单独指定低)
	 * @default true
	 */
	fuzzyQuery?: boolean
	/**
	 * @description 数字类型模糊查询(包含不区分大小写, 去除前后空格, 优先级比单独指定低)
	 * @default false
	 */
	numberFuzzyQuery?: boolean
	fields?: ObjectType<Field>
}