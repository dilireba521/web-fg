import { List } from 'ant-design-vue'

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
  return (
    <div class="pt-8 border-b-[#00000014] border-b-1 border-b-solid">
      <div class="font-500 border-b-[#00000014] border-b-1 border-b-solid pb-2">投资策略</div>
      <List size="large">
        {renderListItem('投资目标', data.name)}
        {renderListItem('投资范围', data.name)}
        {renderListItem('投资策略', data.name)}
      </List>
    </div>
  )
}

// 风险提示函
export const renderRisk = (showTitle: boolean = true) => {
  return (
    <div class={[" border-b-[#00000014] border-b-1 border-b-solid",showTitle ? 'pt-8' : 'pt-0']}>
      {showTitle && (
        <div class="font-500 border-b-[#00000014] border-b-1 border-b-solid pb-2">风险提示函</div>
      )}

      <div class="color-secondary font-h7 px-6 py-4">
        尊敬的投资者：
        <br />
        <br />
        投资有风险，投资需谨慎。公开募集证券投资基金（以下简称“基金”）是一种长期投资工具，其主要功能是分散投资，降低投资单一证券所带来的个别风险。基金不同于银行储蓄等能够提供固定收益预期的金融工具，当您购买基金产品时，既可能按持有份额分享基金投资所产生的收益，也可能承担基金投资所带来的损失。
        <br />
        <br />
        基金销售机构根据法规要求对投资者类别、风险承受能力和基金的风险等级进行划分，并提出适当性匹配意见。本基金法律文件中涉及基金风险特征的表述与基金销售机构对基金的风险评级可能不一致，您在做出投资决策之前，请仔细阅读基金合同、基金招募说明书和基金产品资料概要等产品法律文件和本风险揭示书，充分认识本基金的风险收益特征和产品特性，认真考虑本基金存在的各项风险因素，并根据自身的投资目的、投资期限、投资经验、资产状况等因素充分考虑自身的风险承受能力，在了解产品情况及销售适当性意见的基础上，理性判断并谨慎做出投资决策。
        <br />
        <br />
        根据有关法律法规，基金管理人易方达基金管理有限公司做出如下风险揭示：
        <br />
        <br />
        一、依据投资对象的不同,基金分为股票基金、混合基金、债券基金、货币市场基金、基金中基金、商品基金等不同类型，您投资不同类型的基金将获得不同的收益预期，也将承担不同程度的风险。一般来说，基金的收益预期越高，您承担的风险也越大。
        <br />
        <br />
        二、您应当充分了解基金定期定额投资和零存整取等储蓄方式的区别。定期定额投资是引导投资者进行长期投资、平均投资成本的一种简单易行的投资方式，但并不能规避基金投资所固有的风险，不能保证投资者获得收益，也不是替代储蓄的等效理财方式。
        <br />
        <br />
        三、基金在投资运作过程中可能面临各种风险，投资本基金的一般风险包括市场风险、流动性风险、管理风险、税收风险、技术风险和合规风险等。巨额赎回风险是开放式基金所特有的一种风险，即当单个开放日基金的净赎回申请超过基金总份额的百分之十时，您将可能无法及时赎回申请的全部基金份额，或您赎回的款项可能延缓支付。
        <br />
        <br />
        四、投资本基金可能遇到的风险包括：（1）市场风险；（2）本基金的特有风险：消费行业波动带来的行业风险、基金保持较高股票仓位导致的风险，本基金的投资范围包括科创板股票、存托凭证，可能给本基金带来额外风险；（3）流动性风险；（4）本基金法律文件中涉及基金风险特征的表述与销售机构对基金的风险评级可能不一致的风险；（5）管理风险；（6）其他风险。
        <br />
        <br />
        五、基金管理人承诺以诚实信用、勤勉尽责的原则管理和运用基金资产，但不保证本基金一定盈利，也不保证最低收益。本基金的过往业绩及其净值高低并不预示其未来业绩表现，基金管理人管理的其他基金的业绩并不构成对本基金业绩表现的保证。易方达基金管理有限公司提醒您基金投资的“买者自负”原则，在做出投资决策后，基金运营状况与基金净值变化引致的投资风险，由您自行负担。基金管理人、基金托管人、基金销售机构及相关机构不对基金投资收益做出任何承诺或保证。
        <br />
        <br />
        六、中国证监会对本基金募集的核准，并不表明其对本基金的价值和收益作出实质性判断或保证，也不表明投资于本基金没有风险。基金管理人依照恪尽职守、诚实信用、谨慎勤勉的原则管理和运用基金财产，但不保证基金一定盈利，也不保证最低收益。基金投资者自依基金合同取得基金份额，即成为基金份额持有人和基金合同的当事人。各方当事人因《基金合同》而产生的或与《基金合同》有关的一切争议应尽量通过协商、调解途径解决，如经友好协商未能解决的最终将通过仲裁方式处理，详见《基金合同》。本基金的基金合同、基金招募说明书和基金产品资料概要已通过中国证监会基金电子披露网站http://eid.csrc.gov.cn/fund和基金管理人网站http://www.efunds.com.cn进行了公开披露。
        <br />
        <br />
        七、您应当通过基金管理人或具有基金销售业务资格的其他机构购买赎回基金，具体基金销售机构名单详见基金管理人网站公示。
      </div>
    </div>
  )
}
