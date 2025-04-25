<template>
  <div v-if="screenStore.isMobile">
    <div
      :style="headerStyle"
      :class="[
        'mobile-header',
        {
          black: tabType == 'black'
        }
      ]"
    >
      <div class="flex w-full px-6 pt-14px justify-between items-center">
        <img
          v-if="tabType == 'default'"
          @click="showMobileMenu = !showMobileMenu"
          class="w-8 h-29px"
          :src="iconLogoDefault"
        />
        <img v-else class="w-8 h-29px" @click="jumpHome" :src="iconLogoRed" />
        <!-- <img class="w-5 h-5" @click="showMobileMenu = !showMobileMenu" :src="mobileHeadMenu" /> -->
        <template v-if="showMobileMenu">
          <SvgIcon
            v-if="tabType == 'black'"
            @click="showMobileMenu = false"
            name="icon-closed"
            width="20"
            height="20"
            color="black"
          />
          <SvgIcon
            v-else
            @click="showMobileMenu = false"
            name="icon-closed"
            width="20"
            height="20"
            color="white"
          />
        </template>
        <template v-else>
          <SvgIcon
            v-if="tabType == 'black'"
            @click="showMobileMenu = true"
            name="icon-menu"
            width="20"
            height="20"
            color="black"
          />
          <SvgIcon
            v-else
            @click="showMobileMenu = true"
            name="icon-menu"
            width="20"
            height="20"
            color="white"
          />
        </template>
      </div>
    </div>
    <div class="w-full h-56px"></div>
    <div v-if="showMobileMenu" class="mobile-menu">
      <MenuVue @changeTab="changeTab" @closeMobileMenu="showMobileMenu = false"></MenuVue>
    </div>
  </div>
  <!-- class="relative h-[1px]" -->
  <div v-else>
    <div
      :style="headerStyle"
      :class="[
        'header',
        {
          black: tabType == 'black'
        }
      ]"
    >
      <!-- 一级导航 -->
      <MenuVue @changeTab="changeTab"></MenuVue>
      <img v-if="tabType == 'default'" class="rta-logo" :src="iconLogoDefault" alt="" />
      <img @click="jumpHome" v-else class="rta-logo" :src="iconLogoRed" alt="" />
      <div
        :class="['investor-login', tabType == 'default' ? 'active-white' : 'active-black']"
        @click="showLoginModal = true"
      >
        投资者登录
      </div>
    </div>
    <!-- 占位 -->
    <div :class="['header-seat', 'w-full', { hidden: tabType == 'default' }]"></div>
  </div>
  <!-- 登录弹窗 -->
  <div v-if="showLoginModal" class="modal-overlay" :class="{ 'px-4': screenStore.isMobile }" @click="preventClose">
    <div class="modal-content w-200" @click.stop>
      <div class="modal-body px-8 py-6">
        <!-- 弹窗内容 -->
        <div class="modal-title text-center">合格投资者认证</div>
        <div v-if="!rejectedStatus" class="mb-16 font-h7 font-color-colorTextSecondary">
          <div class="mb-3">
            继续浏览本公司网站前，请您确认您或您所代表的机构是一名“合格投资者”。“合格投资者”指根据任何国家和地区的证券和投资法规所规定的有资格投资于私募证券投资基金的专业投资者。
            例如根据我国《私募投资基金监督管理暂行办法》的规定，合格投资者的标准如下：
          </div>
          <div class="mb-3">
            一、具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元且符合下列相关标准的单位和个人：
          </div>
          <div class="mb-3">1、净资产不低于1000万元的单位；</div>
          <div class="mb-3">
            2、金融资产不低于300万元或者最近三年个人年均收入不低于50万元的个人。(前款所称金融资产包括银行存款、股票、债券、基金份额、资产管理计划、银行理财产品、信托计划、保险产品、期货权益等。)
          </div>
          <div class="mb-3">二、下列投资者视为合格投资者：</div>
          <div class="mb-3">1、社会保障基金、企业年金等养老基金、慈善基金等社会公益基金；</div>
          <div class="mb-3">2、依法设立并在基金业协会备案的投资计划；</div>
          <div class="mb-3">3、投资于所管理私募基金的私募基金管理人及其从业人员；</div>
          <div class="mb-3">4、中国证监会规定的其他投资者。</div>
          <div class="mb-3">
            如果您继续访问或使用本网站及其所载资料，即表明您声明及保证您或您所代表的机构为“合格投资者”，并将遵守对您适用的司法区域的有关法律及法规，同意并接受以下条款及相关约束。
            如果您不符合“合格投资者”标准或不同意下列条款及相关约束，请勿继续访问或使用本网站及其所载信息及资料。
          </div>
          <div class="mb-3">
            投资涉及风险，投资者应详细审阅产品的发售文件以获取进一步资料，了解有关投资所涉及的风险因素，并寻求适当的专业投资和咨询意见。
            产品净值及其收益存在涨跌可能，过往的产品业绩数据并不预示产品未来的业绩表现。本网站所提供的资料并非投资建议或咨询意见，投资者不应依赖本网站所提供的信息及资料作出投资决策。
          </div>
          <div class="mb-3">
            与本网站所载信息及资料有关的所有版权、专利权、知识产权及其他产权均为本公司所有。本公司概不向浏览该资料人士发出、转让或以任何方式转移任何种类的权利。
          </div>
        </div>
        <div v-else class="mb-16 font-h7 font-color-colorTextSecondary">
          <div class="mb-3 text-center">
            根据《私募投资基金监督管理暂行办法》规定，即日起您需确认是合格投资者后，才能查看相关内容！
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button v-if="!rejectedStatus" class="btn-cancel w-30 h-9" @click="handleReject">
          放弃
        </button>
        <button v-if="!rejectedStatus" class="btn-accept w-30 h-9" @click="handleAccept">
          接受
        </button>
        <button v-else class="btn-accept w-30 h-9" @click="resetRejectedStatus">重新确认</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref, nextTick, watch } from 'vue'
import MenuVue from './components/menu.vue'
import { useRoute, useRouter } from 'vue-router' // 添加路由相关导入
import { useGo } from '@/hooks/web/usePage'
import { useScreenStore } from '@/store/modules/screen'
import { SvgIcon } from '@/components/Icon'
import iconLogoDefault from '@/assets/rta-logo.png'
import iconLogoRed from '@/assets/rta-logo-red.png'
import mobileHeadMenu from '@/assets/mobile-head-menu.png'

const { go } = useGo()
const route = useRoute()
const router = useRouter()
const tabType = ref('default')
const headerStyle = ref({})
const isScrollDown = ref(true)
// 控制弹窗显示
const showLoginModal = ref(false)
const showMobileMenu = ref(false)
const screenStore = useScreenStore()
// 添加拒绝状态
const rejectedStatus = ref(false)

// 保存页面滚动位置
let scrollPosition = 0

// 检查用户是否已经接受了条款
const checkUserAcceptance = () => {
  const hasAccepted = localStorage.getItem('investorAccepted')
  if (hasAccepted !== 'true') {
    showLoginModal.value = true
  }
}

// 处理接受按钮点击
const handleAccept = () => {
  localStorage.setItem('investorAccepted', 'true')
  showLoginModal.value = false
}

// 处理拒绝按钮点击
const handleReject = () => {
  rejectedStatus.value = true
}

// 重置拒绝状态
const resetRejectedStatus = () => {
  rejectedStatus.value = false
}

// 阻止点击遮罩关闭弹窗
const preventClose = (e: MouseEvent) => {
  // 如果用户已接受，允许关闭；否则阻止关闭
  if (localStorage.getItem('investorAccepted') === 'true') {
    showLoginModal.value = false
  }
  e.stopPropagation()
}

// 监听弹窗显示状态变化
watch(
  () => showLoginModal.value,
  (newVal) => {
    if (newVal) {
      // 记录当前滚动位置
      scrollPosition = window.pageYOffset || document.documentElement.scrollTop
      // 禁用背景滚动
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${scrollPosition}px`
    } else {
      // 恢复背景滚动
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      // 恢复滚动位置
      window.scrollTo(0, scrollPosition)
    }
  }
)

// 同样监听移动菜单显示状态
watch(
  () => showMobileMenu.value,
  (newVal) => {
    if (newVal) {
      scrollPosition = window.pageYOffset || document.documentElement.scrollTop
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${scrollPosition}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      window.scrollTo(0, scrollPosition)
    }
  }
)

function changeTab(type: string) {
  tabType.value = type
}

// 更新导航栏样式的函数
function updateHeaderStyle(scrollTop = 0) {
  let _style = {}
  if (scrollTop <= 1) {
    isScrollDown.value = true
    _style = {
      position: 'absolute'
    }
  } else {
    isScrollDown.value = false
    _style = {
      transform: 'translateY(0px)',
      position: 'fixed'
    }
  }
  headerStyle.value = _style
}

function handleWheel(e: WheelEvent) {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  let _style = {}
  if (scrollTop <= 1) {
    isScrollDown.value = true
    _style = {
      position: 'absolute'
    }
  } else {
    if (e.deltaY > 0) {
      _style = {
        position: 'fixed',
        transform: 'translateY(-56px)',
        display: isScrollDown.value ? 'none' : 'block'
      }
    } else {
      isScrollDown.value = false
      _style = {
        transform: 'translateY(0px)',
        position: 'fixed'
      }
    }
  }
  headerStyle.value = _style
}

// 移动端监听滑动事件
// 添加触摸事件相关变量
const touchStartY = ref(0)
const touchEndY = ref(0)
const lastScrollTop = ref(0)

// 处理触摸开始事件
function handleTouchStart(e: TouchEvent) {
  touchStartY.value = e.touches[0].clientY
}

// 处理触摸移动事件
function handleTouchMove(e: TouchEvent) {
  touchEndY.value = e.touches[0].clientY
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  
  // 计算触摸方向和距离
  const touchDiff = touchEndY.value - touchStartY.value
  
  // 判断滑动方向
  if (scrollTop <= 1) {
    // 在顶部时，导航栏始终显示
    isScrollDown.value = true
    headerStyle.value = {
      position: 'absolute'
    }
  } else {
    // 向下滑动（手指向上移动，touchDiff < 0）
    if (touchDiff < -5 && scrollTop > lastScrollTop.value) {
      // 向下滑动，隐藏导航栏
      headerStyle.value = {
        position: 'fixed',
        transform: 'translateY(-56px)',
        display: isScrollDown.value ? 'none' : 'block'
      }
    } 
    // 向上滑动（手指向下移动，touchDiff > 0）
    else if (touchDiff > 5 && scrollTop < lastScrollTop.value) {
      // 向上滑动，显示导航栏
      isScrollDown.value = false
      headerStyle.value = {
        transform: 'translateY(0px)',
        position: 'fixed'
      }
    }
  }
  
  // 更新上次滚动位置
  lastScrollTop.value = scrollTop
}

// 监听路由变化
router.afterEach((to, from) => {
  // 路由变化后，重置导航栏样式
  nextTick(() => {
    // 确保DOM已更新
    setTimeout(() => {
      updateHeaderStyle(0)
    }, 100)
  })
})

// 添加对 isMobile 的监听
watch(
  () => screenStore.isMobile,
  (newValue) => {}
)

const jumpHome = () => {
  go({
    path: '/home'
  })
  changeTab('default')
}

onMounted(() => {
  // 确保 screen store 已初始化
  screenStore.init()
  
  // 根据设备类型添加不同的事件监听
  if (screenStore.isMobile) {
    // 移动设备添加触摸事件监听
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove)
  } else {
    // 桌面设备添加滚轮事件监听
    document.addEventListener('wheel', handleWheel)
  }
  
  // 初始化时设置正确的样式
  updateHeaderStyle(window.pageYOffset || document.documentElement.scrollTop)
  // 检查用户是否已接受条款
  checkUserAcceptance()
})

onUnmounted(() => {
  // 移除事件监听
  document.removeEventListener('wheel', handleWheel)
  document.removeEventListener('touchstart', handleTouchStart)
  document.removeEventListener('touchmove', handleTouchMove)
  
  // 确保在组件卸载时恢复页面滚动
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.width = ''
  document.body.style.top = ''
})
</script>
<style lang="less" scoped>
.header-seat {
  height: 56px;
}

.header {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 56px;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
  transition: all 0.2s linear;

  &.black {
    background: rgba(255, 255, 255, 1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    // background-color: red;
  }

  .rta-logo {
    width: 32px;
    height: 29px;
    position: absolute;
    top: 14px;
    left: 48px;
    z-index: 1;
  }
}

.investor-login {
  font-weight: 400;
  font-size: 14px;
  position: absolute;
  top: 18px;
  right: 40px;
  cursor: pointer; // 添加鼠标指针样式
  z-index: 99;

  &.active-white {
    color: rgba(@colorWhite, 0.88);
  }
  &.active-black {
    color: rgba(@colorBlack, 0.88);
  }
}

// 弹窗样式
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-body {
  flex: 1;
  overflow-y: auto;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: @colorText;
}

.modal-footer {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
}

.btn-cancel,
.btn-accept {
  padding: 8px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-cancel {
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid #d9d9d9;
  color: rgba(0, 0, 0, 0.65);

  &:hover {
    background-color: #e0e0e0;
  }
}

.btn-accept {
  background-color: @colorPrimary1;
  border: 1px solid @colorPrimary1;
  color: white;

  &:hover {
    opacity: 0.9;
  }
}

.mobile-menu {
  position: fixed;
  top: 56px;
  left: 0;
  width: 100%;
  height: calc(100% - 56px);
  background-color: @colorWhite;
  display: flex;
  z-index: 1000;
}

// 弹窗样式
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 90vh; // 限制最大高度，确保在小屏幕上也能看到
}

.modal-body {
  flex: 1;
  overflow-y: auto; // 只允许弹窗内容滚动
  -webkit-overflow-scrolling: touch; // 增强移动端滚动体验
}

// ... 其他样式保持不变 ...

.mobile-menu {
  position: fixed;
  top: 56px;
  left: 0;
  width: 100%;
  height: calc(100vh - 56px); // 修正计算表达式
  background-color: @colorWhite;
  display: flex;
  z-index: 1000;
  overflow-y: auto; // 允许菜单内容滚动
  -webkit-overflow-scrolling: touch;
}

.mobile-header {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 56px;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
  transition: all 0.2s linear;

  &.black {
    background: rgba(255, 255, 255, 1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    // background-color: red;
  }

  .rta-logo {
    width: 32px;
    height: 29px;
    position: absolute;
    top: 14px;
    left: 48px;
    z-index: 1;
  }
}
</style>
