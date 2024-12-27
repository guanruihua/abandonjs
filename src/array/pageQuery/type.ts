import { type ObjectType } from "../../type"

type SortBy = ObjectType<'desc' | 'asc' | unknown>

export type Pagination = {
	pageSize: number
	current: number
	sortBy?: SortBy
	total?: number
}

export type DataSourceConfig = ObjectType & Pick<Pagination, 'sortBy'>

export interface PageQueryProps {
	/**
	 * @description 唯一索引
	 * @default 'id'
	 */
	uniqueIndex?: string
	/**
	 * @description 保持原值, 不进行转换后比对
	 */
	keepFields?: string[]
	/**
	 * @description 不需要范围处理的查询参数
	 */
	noRangeFields?: string[]
	/**
	 * @description 数据处理(全字段配置)
	 */
	handleValue?: (value: unknown, key?: string) => unknown
	/**
	 * @description 数据处理(单个字段配置)
	 */
	fields?: ObjectType<(value: unknown, key?: string) => unknown>
}