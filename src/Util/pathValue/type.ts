export type PathConfObject = {
  /**
   * @description 忽略数组
   */
  ignoreArray?: boolean
  /**
   * @description 分隔符
   * @default '.'
   */
  gap?: string
  /**
   * @description 路径
   */
  path?: string | number
}

export type PathConf = PathConfObject | string | number
