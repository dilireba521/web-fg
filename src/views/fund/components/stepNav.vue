<template>
  <div>
    <div class="step-nav flex-wrap mb-4">
      <div
        class="step-item"
        v-for="(item, index) in steps"
        :key="index"
        :class="{ active: currentStep === index }"
      >
        <span class="step-number font-h6">{{ String(index + 1).padStart(2, '0') }}、</span>
        <span class="font-color-colorText font-bold font-h6">{{ item }}</span>
      </div>
    </div>
    <div class="flex mb-8">
        <div class="step-content h-40 p-4" v-for="(contents1,index) in stepsContent">
            <div v-for="(item, itemIndex) in formatContent(contents1)" :key="itemIndex" class="content-item font-color-colorTextSecondary font-h7 font-normal">
                • {{ item }}
            </div>
        </div>
    </div>
    <div class="step-nav-left flex-wrap mb-4">
      <div
        class="step-item"
        v-for="(item, index) in steps2"
        :key="index"
        :class="{ active: currentStep === index }"
      >
        <span class="step-number font-h6">{{ String(10 - index).padStart(2, '0') }}、</span>
        <span class="font-color-colorText font-bold font-h6">{{ item }}</span>
      </div>
    </div>
    <div class="flex mb-8">
        <div class="step-content h-40 p-4" v-for="(contents2,index) in stepsContent2">
            <div v-for="(item, itemIndex) in formatContent(contents2)" :key="itemIndex" class="content-item font-color-colorTextSecondary font-h7 font-normal">
                • {{ item }}
            </div>
        </div>
    </div>
    <div class="step-nav-third flex-wrap mb-4">
        <div class="step-item-right">
            <span class="step-number font-h6">11、</span>
            <span class="font-color-colorText font-bold font-h6">T+N日向托管机构 确认份额</span>
        </div>
        <div class="step-item-end">
            <span class="font-color-colorText font-bold font-h6">申购完成</span>
        </div>
    </div>
    <div class="flex mb-8">
        <div class="step-content h-40 p-4">
            <div v-for="(item, itemIndex) in formatContent(stepsContent3)" :key="itemIndex" class="content-item font-color-colorTextSecondary font-h7 font-normal">
                • {{ item }}
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  currentStep: {
    type: Number,
    default: 0
  }
})

const steps = ['填写基本信息', '风险等级评估', '投资者适当性匹配', '基金风险揭示', '合格投资者确认']
const stepsContent = ['•投资者准确完整填写《投资者基本信息表》，并提供相应证明资料； •管理人对投资者身份信息进行核查。', 
                      '•投资者准独立完成《投资者风险测评问卷》； •管理人综合评估投资者风险承受能力，并在5个工作日内，告知投资者风险等级评估结果。', 
                      '•管理人根据投资者风险承受能力、产品的风险等级等信息，依据匹配原则，对投资者提出适当性匹配意见； •投资者通过签署《投资者类型及风险匹配告知书》确认。', 
                      '•在清楚知晓投资风险后，投资者需签署《风险揭示书》。', 
                      '•投资者提供资产证明或收入证明文件，证明自己符合合格投资者标准。']
const steps2 = ['T日提交申购开户 和交易申请','回访确认', '投资冷静期', '投资者缴纳款项', '签署基金合同']
const stepsContent2 = ['', 
                      '•冷静期后，管理人以电话、邮件或信函方式进行投资回访，投资者按实践情况逐一确认。', 
                      '•投资者进款后有不小于24小时的冷静期； •冷静期内管理人不得主动联系投资者，投资者有权解除基金合同。', 
                      '•投资者根据基金合同里的募集账户缴款，缴款后保存凭条或打印回单，通知管理人已经缴款； •管理人查询款项到账情况后通知投资者。', 
                      '']
const stepsContent3 = "•投资者可登录托管机构官网查询份额。"

const formatContent = (content: string) => {
  // 移除开头的"•"符号(如果有)，然后按"•"分割
  return content.replace(/^•\s*/, '').split('•').filter(item => item.trim() !== '');
}
</script>

<style scoped>
.step-nav {
  display: flex;
  width: 100%;
  margin: 20px 0;
  height: 56px;
}

.step-item {
  flex: 1;
  position: relative;
  background: #f0f0f0;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
  margin-right: 0;
  justify-content: center;
  clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%);
}

.step-item:not(:first-child) {
  padding-left: 30px;
  clip-path: polygon(95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%, 0% 0%);
}

.step-number {
  font-weight: bold;
}

.step-text {
  font-size: 14px;
}

.step-item.active {
  background: #e6f7ff;
}

/* 最后一个元素不需要右边的箭头形状 */
.step-item:last-child {
  clip-path: polygon(95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%, 0% 0%);
}

.step-nav-left {
  display: flex;
  width: 100%;
  margin: 20px 0;
  height: 56px;

  .step-item {
    flex: 1;
    position: relative;
    background: #f0f0f0;
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 100%;
    margin-right: 0;
    justify-content: center;
    clip-path: polygon(100% 0%, 95% 50%, 100% 100%, 5% 100%, 0% 50%, 5% 0%);
  }

  .step-number {
    font-weight: bold;
    color: #333;
  }

  .step-text {
    font-size: 14px;
    color: #333;
  }

  .step-item.active {
    background: #e6f7ff;
  }
}

.step-nav-third {
    display: flex;
    width: 100%;
    margin: 20px 0;
    height: 56px;

    .step-item-right {
        position: relative;
        background: #f0f0f0;
        padding: 0 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        height: 100%;
        margin-right: 0;
        justify-content: center;
        clip-path: polygon(95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%, 0% 0%);
        width: 20%;

        .step-number {
            font-weight: bold;
            color: #333;
        }

        .step-text {
            font-size: 14px;
            color: #333;
        }
    }
    
    .step-item-end {
        position: relative;
        background: #f0f0f0;
        padding: 0 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        height: 100%;
        margin-right: 0;
        justify-content: center;
        clip-path: polygon(100% 0%, 100% 50%, 100% 100%, 0% 100%, 5% 50%, 0% 0%);
        width: 20%;
    }
}

.step-content{
    border: 1px dashed rgba(0,0,0,0.1);
    border-right: none;
    width: 20%;
}

.step-content:last-child{
    border: 1px dashed rgba(0,0,0,0.1);
}
</style>
