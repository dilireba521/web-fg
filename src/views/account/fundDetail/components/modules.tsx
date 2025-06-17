import { renderPanel } from '@/views/account/index/components/modules'
import { Col, Row } from 'ant-design-vue'
import { formateNumStr } from '@/utils/formate'
import { getTextColor } from "@/utils/color"
// 基金数据
export const renderFund = (data: any) => {
  return (
    <>
      <div class="flex font-h8 color-tertiary">
        <div class="mr-12">净值最新更新日期：{data?.last_update_time || '- -'}</div>
        <div class="mr-3">最新折算汇率：{data?.exchange_rate}</div>
        <div>数据来源：中国银行</div>
      </div>
      <Row class="mt-1" gutter={8}>
        <Col flex={'208px'}>
          {renderPanel({
            title: '最新净值',
            type: 'default',
            panelClass: 'h-[100px]',
            content: () => (
              <div class="pt-2">
                <div class="text-xs color-tertiary leading-5">CNY</div>
                <div class="font-h5">{formateNumStr(data?.net_worth)}</div>
              </div>
            )
          })}
        </Col>
        <Col flex={'208px'}>
          {renderPanel({
            title: '持有份额',
            type: 'default',
            panelClass: 'h-[100px]',
            content: () => (
              <div class="pt-2">
                <div class="text-xs color-tertiary leading-5">&nbsp;</div>
                <div class="font-h5">{formateNumStr(data?.shares, { decimals: 2 })}</div>
              </div>
            )
          })}
        </Col>
        <Col flex={'400px'}>
          {renderPanel({
            title: '持有价值',
            type: 'default',
            panelClass: 'h-[100px]',
            content: () => (
              <div class="flex">
                <div class="pt-2 flex-1">
                  <div class="text-xs color-tertiary leading-5">
                    {data?.fund_unit == '人民币' ? 'CNY' : 'USD'}
                  </div>
                  <div class="font-h5">{formateNumStr(data?.asset, { decimals: 2 })}</div>
                </div>
                {/* <div class="pt-2 flex-1">
                  <div class="text-xs color-tertiary leading-5">USD</div>
                  <div class="font-h5">{formateNumStr(1234567890.0, { decimals: 2 })}</div>
                </div> */}
              </div>
            )
          })}
        </Col>
        <Col flex={'400px'}>
          {renderPanel({
            title: '累积收益',
            type: 'default',
            panelClass: 'h-[100px]',
            content: () => (
              <div class="flex">
                <div class="pt-2 flex-1">
                  <div class="text-xs color-tertiary leading-5"> {data?.fund_unit == '人民币' ? 'CNY' : 'USD'}</div>
                  <div class="font-h5">{formateNumStr(data?.total_earnings, { decimals: 2 })}</div>
                </div>
                {/* <div class="pt-2 flex-1">
                  <div class="text-xs color-tertiary leading-5">USD</div>
                  <div class="font-h5">{formateNumStr(1234567890.0)}</div>
                </div> */}
              </div>
            )
          })}
        </Col>
        <Col flex={'auto'}>
          {renderPanel({
            title: '累积收益率',
            type: 'default',
            panelClass: 'h-[100px]',
            content: () => (
              <div class="pt-2 flex-1">
                <div class="text-xs color-tertiary leading-5">&nbsp;</div>
                <div class={["font-h5", getTextColor(data?.total_earnings_rate)]}>
                  {formateNumStr(data?.total_earnings_rate, { decimals: 2 })}
                </div>
              </div>
            )
          })}
        </Col>
      </Row>
    </>
  )
}
