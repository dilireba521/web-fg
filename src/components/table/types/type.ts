import type { TableProps } from 'ant-design-vue'
import { tableProps } from 'ant-design-vue/es/table'
import type { ColumnProps } from 'ant-design-vue/lib/table'
import type { VNodeChild } from 'vue'

export declare type SortOrder = 'ascend' | 'descend'

export interface FetchSetting {
  // 请求接口当前页数
  pageField: string
  // 每页显示多少条
  sizeField: string
  // 请求结果列表字段  支持 a.b.c
  listField: string
  // 请求结果总数字段  支持 a.b.c
  totalField: string
}

export interface BaseTableProps extends TableProps {
  // 是否手动筛选
  isHandle?: boolean
  // 接口请求对象
  api?: (...arg: any) => Promise<any>
  // 额外的请求参数
  searchInfo?: any
  beforeFetch?: Fn
  afterFetch?: Fn
  // 请求接口配置
  fetchSetting?: Partial<FetchSetting>
  // 是否显示loading动画
  showLoading?: boolean
  // 立即执行
  immediate?: boolean
  clearSelectOnPageChange?: boolean
  // 默认的排序参数
  defSort?: Recordable
  // 自定义排序方法
  sortFn?: (sortInfo: SorterResult) => any
  // 排序方法
  filterFn?: (data: Partial<Recordable<string[]>>) => any
  // 是否仅对现有数据做操作
  isOnlyCurrentData?: boolean
  // 查询条件请求之前处理
  handleSearchInfoFn?: Fn
  isTreeTable?: boolean
  // 序号列配置
  indexColumnProps?: BasicColumn
  // 是否显示序号列
  showIndexColumn?: boolean
}

export interface SorterResult {
  column: ColumnProps
  order: SortOrder
  field: string
  columnKey: string
}

export interface FetchParams {
  searchInfo?: Recordable
  pageIndex?: number
  sortInfo?: Recordable
  filterInfo?: Recordable
}
export interface GetColumnsParams {
  ignoreIndex?: boolean
  ignoreAction?: boolean
  sort?: boolean
}
export type CellFormat =
  | string
  | ((text: string, record: Recordable, index: number) => string | number)
  | Map<string | number, any>

// @ts-ignore
export interface BasicColumn extends ColumnProps<Recordable> {
  children?: BasicColumn[]
  filters?: {
    text: string
    value: string
    children?:
      | unknown[]
      | (((props: Record<string, unknown>) => unknown[]) & (() => unknown[]) & (() => unknown[]))
  }[]

  //
  flag?: 'INDEX' | 'DEFAULT' | 'CHECKBOX' | 'RADIO' | 'ACTION'
  customTitle?: VueNode

  slots?: Recordable

  // 自定义header渲染
  customHeaderRender?: (column: BasicColumn) => string | VNodeChild | JSX.Element
  // Whether to hide the column by default, it can be displayed in the column configuration
  defaultHidden?: boolean

  // Help text for table column header
  helpMessage?: string | string[] | VNodeChild | JSX.Element

  format?: CellFormat

  // Editable
  // edit?: boolean;
  // editRow?: boolean;
  // editable?: boolean;
  // editComponent?: ComponentType;
  // editComponentProps?:
  //   | ((opt: {
  //       text: string | number | boolean | Recordable;
  //       record: Recordable;
  //       column: BasicColumn;
  //       index: number;
  //     }) => Recordable)
  //   | Recordable;
  // editRule?: boolean | ((text: string, record: Recordable) => Promise<string>);
  // editValueMap?: (value: any) => string;
  // onEditRow?: () => void;
  // 权限编码控制是否显示
  // auth?: RoleEnum | RoleEnum[] | string | string[];
  // 业务控制是否显示
  ifShow?: boolean | ((column: BasicColumn) => boolean)
  // 自定义修改后显示的内容
  editRender?: (opt: {
    text: string | number | boolean | Recordable
    record: Recordable
    column: BasicColumn
    index: number
    currentValue: string | number | boolean | Recordable
  }) => VNodeChild | JSX.Element
  // 动态 Disabled
  editDynamicDisabled?: boolean | ((record: Recordable) => boolean)
}
