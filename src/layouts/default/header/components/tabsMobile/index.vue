<script setup>
import { onMounted, ref, watch } from 'vue'
import { useScreenStore } from '@/store/modules/screen'
const emit = defineEmits(['change', 'update:active'])
const screenStore = useScreenStore()
const props = defineProps({
  list: {
    type: Array,
    default: () => [
      {
        label: '标签1',
        value: '1'
      },
      {
        label: '标签2',
        value: '2'
      }
    ]
  },
  active: {
    type: String,
    default: '1'
  },
  size: {
    // 大还是小,一级菜单小，二级菜单大
    type: String,
    default: 'default',
    validator: (value) => {
      return ['default', 'large'].includes(value)
    }
  },
  type: {
    // 白色字还是黑色字
    type: String,
    default: 'default',
    validator: (value) => {
      return ['default', 'black'].includes(value)
    }
  }
})
const curActive = ref('')
const tabsTargets = ref([
  {
    path: '/about/index',
    targets: [
      {
        label: '公司介绍',
        value: 'companyIntroRef'
      },
      {
        label: '企业文化',
        value: 'companyCultureRef'
      },
      {
        label: '发展历程',
        value: 'developCourseRef'
      },
      {
        label: '核心团队',
        value: 'coreTeamRef'
      },
      {
        label: '合作机构',
        value: 'partnerRef'
      }
    ]
  },
  {
    path: '/frame/index',
    targets: [
      {
        label: '投资框架',
        value: 'investFrameRef'
      },
      {
        label: '投资理念',
        value: 'investIdeaRef'
      },
      {
        label: '投资研究',
        value: 'investStudyRef'
      },
      {
        label: '投资风控',
        value: 'investControlRef'
      }
    ]
  },
  {
    path: '/fund/index',
    targets: [
      {
        label: '申购流程',
        value: 'applicationProcessRef'
      },
      {
        label: '旗下产品',
        value: 'subordinateProductsRef'
      }
    ]
  },
  {
    path: '/news/index',
    targets: [
      {
        label: '公司公告',
        value: 'companyAnnouncementRef'
      },
      {
        label: '新闻资讯',
        value: 'informationRef'
      }
    ]
  }
])
const subTabs = ref([])

const matchSubTabs = (value) => {
  const matchedItem = tabsTargets.value.find((item) => item.path == value)
  if (matchedItem) {
    subTabs.value = matchedItem.targets
  } else {
    subTabs.value = []
  }
}

watch(
  () => props.active,
  (val) => {
    curActive.value = val
    matchSubTabs(val)
  },
  { immediate: true }
)

function handleClick(data) {
  curActive.value = data.value
  emit('update:active', data.value)
  // 查找是否存在匹配的项
  const matchedItem = tabsTargets.value.find((item) => item.path == data.value)

  if (matchedItem) {
    // 如果找到匹配项，设置子标签
    subTabs.value = matchedItem.targets
  } else {
    // 如果没有匹配项，清空子标签并执行路由跳转
    subTabs.value = []
    emit('change', data.value)
  }
}
const handleTargets = (item,index) => {
    localStorage.setItem('MOBILE_SCOLL_TARGET',index)
    emit('change', curActive.value)
}
</script>
<template>
  <div class="flex w-full">
    <div class="tabs min-w-32 tabs-mobile flex-col background-colorBgLayout">
      <div
        @click="handleClick(item)"
        v-for="item in props.list"
        :key="item.value"
        :class="[
          'tab-item font-h7 black',
          {
            active: item.value == curActive,
            large: props.size == 'large'
            // black: props.type == 'black'
          }
        ]"
      >
        <div class="tab-inner">{{ item.label }}</div>
      </div>
    </div>
    <div class="flex-1 background-white tabs-mobile py-4">
      <div
        v-for="(item, index) in subTabs"
        @click="handleTargets(item,index)"
        class="px-6 py-4 font-h5 font-color-colorTextSecondary"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tabs {
  display: flex;

  .tab-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 24px;
    height: 54px;
    color: rgba(@colorWhite, 0.88);

    &.large {
      height: 64px;
      padding: 0 40px;
    }

    &.black {
      color: rgba(@colorBlack, 0.88);
    }

    .tab-inner {
      padding: 4px 0;
      border-bottom: 1px solid transparent;
    }

    &.active {
      color: rgba(@colorWhite, 1);

      .tab-inner {
        border-bottom-color: rgba(@colorWhite, 0.88);
      }

      &.black {
        color: rgba(@colorBlack, 1);

        .tab-inner {
          border-bottom-color: rgba(@colorPrimaryActive, 1);
        }
      }
    }
  }
}

.tabs-mobile {
  height: calc(100vh - 56px);
}
</style>
