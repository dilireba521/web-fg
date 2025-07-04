import { List } from 'ant-design-vue'
import { onMounted, ref } from 'vue'

function renderListItem(name: string, value: any) {
  return (
    <List.Item class="text-sm leading-[22px] flex !items-baseline !justify-start">
      <div class="text-nowrap">{name}：</div>
      <div class="color-secondary pl-8">{value || '- -'}</div>
    </List.Item>
  )
}
// 基本信息
export const renderBaseInfo = (data: any) => {
  const _manager = data?.managers
    ?.map((item) => {
      return item?.manager?.name
    })
    ?.join(',')
  return (
    <div class="pt-16 border-b-[#00000014] border-b-1 border-b-solid">
      <div class="font-500 border-b-[#00000014] border-b-1 border-b-solid pb-2">基本信息</div>
      <List size="large">
        {renderListItem('基金名称', data?.name)}
        {renderListItem('基金代码', data?.code)}
        {renderListItem('基金类型', data?.type?.name)}
        {renderListItem('成立日期', data?.establishDate)}
        {renderListItem('基金经理', _manager)}
      </List>
    </div>
  )
}

// 投资策略
export const renderStrate = (data: any) => {
  // const parts = data?.investmentStrategy.split(/(投资目标：|投资范围：|投资策略：)/)?.filter(part => part && !["投资目标：", "投资范围：","投资策略：",''].includes(part));;

  return (
    <div class="pt-8 border-b-[#00000014] border-b-1 border-b-solid">
      <div class="font-500 border-b-[#00000014] border-b-1 border-b-solid pb-2">投资策略</div>
      {/* <pre class='py-2 whitespace-pre-wrap break-words'>{data?.investmentStrategy}</pre> */}
      <List size="large">
        {renderListItem('投资目标', data?.investmentTarget)}
        {renderListItem('投资范围', data?.investmentRange)}
        {renderListItem('投资策略', data?.investmentStrategy)}
      </List>
    </div>
  )
}

// 风险提示函
export const renderRisk = (showTitle: boolean = true) => {
  const htmlContent = ref('')

  async function getHtmlContent() {
    const response = await fetch('/static/riskLetter.html')
    htmlContent.value = await response.text()
  }
  getHtmlContent()
  return () => (
    <div class={['', showTitle ? 'pt-8' : 'pt-0']}>
      {showTitle && (
        <div class="font-500 border-b-[#00000014] border-b-1 border-b-solid pb-2">风险提示函</div>
      )}
      <div v-html={htmlContent.value}></div>
      {/* <div class="color-secondary font-h7 px-6 py-4">
        尊敬的合格投资者：
        <br />
        <br />
        投资有风险，投资决策须独立、谨慎。私募投资基金（以下简称“基金”）是面向合格投资者非公开募集的投资产品，具有高风险、高收益的特征。基金不同于银行存款、国债等固定收益类金融产品，您认购/申购本基金份额，可能获得投资收益，也可能面临投资本金亏损乃至全部损失的风险。
        <br />
        <br />
        基金管理人/募集机构已根据法律法规要求对您的风险识别能力、风险承受能力及本基金产品的风险等级进行了评估，并提出适当性匹配意见。本基金法律文件（《基金合同》、《私募投资基金招募说明书》或《私募投资基金说明书》、《私募投资基金风险揭示书》等）中涉及基金风险特征的表述可能与募集机构对基金的风险评级存在差异。在做出最终投资决策前，您务必仔细、完整地阅读本基金的全部法律文件，特别是风险揭示部分，充分理解本基金的投资策略、投资范围、风险收益特征及各项特有风险。请结合自身的投资目标、投资期限、投资经验、资产状况、风险承受能力等实际情况，独立、审慎评估本基金的风险与您的承受能力的匹配度，并在充分了解产品情况及募集机构适当性意见的基础上，理性判断并自主做出投资决策。
        <br />
        <br />
        根据有关法律法规及自律规则，诺言私募基金管理有限公司作为基金管理人特此向您揭示投资本基金可能面临的以下主要风险：
        <br />
        <br />
        一、基金产品特性风险
        <br />
        本基金依据投资策略、投资标的及资产配置的不同，可能划分CTA、混合、中性等不同类型。不同类型基金的风险收益特征存在显著差异。通常，预期收益潜力越高的基金，其潜在风险（包括本金损失风险）也越高。本基金的具体类型、策略及风险特征详见基金法律文件。
        <br />
        <br />
        二、投资运作相关风险
        <br />
        本基金在投资运作过程中可能面临多种风险，主要包括（但不限于）：
        市场风险、流动性风险、信用风险、管理风险、操作及技术风险、合规与法律风险、估值风险、税收风险等。
        <br />
        <br />
        三、 本基金的特有风险
        <br />
        本基金的具体投资策略、投资范围、投资限制、交易结构设计等可能带来特有的风险，这些风险将在基金法律文件中详细说明。
        <br />
        <br />
        四、 管理人声明与投资者责任
        <br />
        1.
        基金管理人承诺以恪尽职守、诚实信用、谨慎勤勉的原则管理和运用基金资产，但不保证基金财产一定盈利，也不承诺或保证最低收益。
        <br />
        2.
        基金的过往业绩及其净值高低并不预示其未来表现，基金管理人管理的其他基金的业绩并不构成对本基金业绩表现的保证。
        <br />
        3.
        中国证券投资基金业协会对本基金管理人的登记备案及本基金的备案，均不构成对基金管理人投资管理能力、持续合规情况的认可，也不构成对本基金财产安全的保证，不作为对基金财产价值和收益的实质性判断或保证。备案不表明投资于本基金没有风险。
        <br />
        4. 私募基金投资遵循“买者自负”原则。
        基金管理人、基金托管人、基金服务机构（包括募集机构）及相关机构均不对基金投资收益做出任何形式的承诺或担保。在您签署基金合同并交付投资资金后，基金运营状况与基金净值变化引致的投资风险及损失，将由您自行承担。
        <br />
        <br />
        五、 重要法律事项
        <br />
        1. 您依基金合同取得基金份额，即成为基金份额持有人和基金合同的当事人。
        <br />
        2.
        各方当事人因《基金合同》而产生的或与《基金合同》有关的一切争议，应首先通过友好协商解决。协商不成的，应按照《基金合同》约定的争议解决方式（仲裁或诉讼）及地点进行处理。请务必仔细阅读《基金合同》的争议解决条款。
        <br />
        3.
        本基金的《基金合同》、《私募投资基金说明书》或《招募说明书》、《风险揭示书》等法律文件，您可通过基金管理人指定的方式（如官方网站、官方信息披露平台）或中国证券投资基金业协会指定的私募基金信息披露备份平台进行查阅。
      </div> */}
    </div>
  )
}
