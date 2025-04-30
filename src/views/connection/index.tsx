import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { WEB_BG_HEAD } from '@/utils/resources'
import { useScreenStore } from '@/store/modules/screen'

import investorPDF from '@/assets/documents/investor-qualification.pdf'
import connectAddress from '@/assets/connect-address.png'
import iconAttachment from '@/assets/icon-attachment.png'

export default defineComponent({
  setup(props, ctx) {
    const screenStore = useScreenStore()
    const serviceBoxClass = 'w-[calc((100%-32px)/3)] min-h-232px px-4 py-6'

    // 添加下载PDF文件的处理函数
    const handleDownloadPDF = (pdfUrl: string, fileName: string) => {
      // 在新窗口中打开PDF文件
      window.open(pdfUrl, '_blank');
      return;
      // 创建一个隐藏的a标签下载
      const link = document.createElement('a')
      link.href = pdfUrl
      link.target = '_blank' // 在新窗口打开
      link.download = fileName // 设置下载的文件名
      
      // 将链接添加到文档中
      document.body.appendChild(link)
      
      // 模拟点击链接
      link.click()
      
      // 从文档中移除链接
      document.body.removeChild(link)
    }

    const handleMobilePDF = (pdfUrl: string, fileName: string) => {
      window.open(pdfUrl, '_blank');
    }

    return () => (
      <div>
        {screenStore.isMobile ? (
          <div
            class="w-full h-390px bg-cover bg-center bg-no-repeat pt-12 pl-8"
            style={{ backgroundImage: `url(${WEB_BG_HEAD}/mobile-head-connect.png)` }}
          >
            {/* <div class="font-color-colorText" style={{ fontSize: '32px' }}>
              联系我们
            </div> */}
          </div>
        ) : (
          <div
            class="w-full h-120 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${WEB_BG_HEAD}/head-connect.png)` }}
          ></div>
        )}
        {screenStore.isMobile ? null : (
          <div
            class="w-full h120 bg-cover bg-center bg-no-repeat px-80 py-24 flex flex-col justify-center"
            style={{ backgroundImage: `url(${connectAddress})` }}
          >
            <div class="font-h4 font-color-colorText mb-6">诺言（湖北）私募基金管理有限公司</div>
            <div class="font-h6 font-color-colorTextSecondary">
              <div>地址：厦门市思明区波特曼财富中心</div>
              <div class="mb-2">电话：0592-5775575</div>
              <div class="mb-2">邮箱：service@rta-fund.com</div>
            </div>
            {/* <div class="mt-auto flex">
              <div class="text-center mr-8">
                <div class="w-24 h-24 background-white mb-2 flex items-center justify-center">
                  <img class="w-20 h-20" src={rtaLogoRed} alt="" />
                </div>
                <div class="font-h7 font-color-colorTextTertiary">微信公众号</div>
              </div>
              <div class="text-center">
                <div class="w-24 h-24 background-white mb-2 flex items-center justify-center">
                  <img class="w-20 h-20" src={rtaLogoRed} alt="" />
                </div>
                <div class="font-h7 font-color-colorTextTertiary">微信小程序</div>
              </div>
            </div> */}
          </div>
        )}
        {screenStore.isMobile ? (
          <div class="px-6 pt-10 pb-8 background-white">
            <div class="font-h1 font-bold text-center mb-6 font-color-colorText">投资者服务</div>
            <div class="p-4 mb-4 w-full min-h-152px mb-4" style={{ background: 'linear-gradient(180deg, #F4F9FF 0%, #EEF6FF 100%)' }}>
              <div class="text-base font-color-colorText font-bold mb-2">什么是合格投资者？</div>
              <div class="font-h5 font-color-colorTextSecondary">
                根据中国证监会《私募投资基金监督管理暂行办法》及相关法规，合格投资者的认定标准为：
                1、过去 3 年年均收入≥50 万元或金融资产≥300 万元的个人；2、净资产≥1000 万元的机构或企业。
              </div>
            </div>
            <div class="p-4 mb-4 w-full min-h-152px mb-4" style={{ background: 'linear-gradient(180deg, #F7F8FF 0%, #EEF0FF 100%)' }}>
              <div class="text-base font-color-colorText font-bold mb-4">如何证明合格投资者身份？</div>
              <div class="font-h5 font-color-colorTextSecondary">
                <div class="font-bold mb-1">个人投资者</div>
                <div class="mb-4">提供附带盖章的收入或资产证明文件材料</div>
                <div class="font-bold mb-1">机构投资者</div>
                <div>提供最近一年的机构审计报告或财务报表</div>
                <div class="flex items-center mt-4" onClick={() => handleMobilePDF(investorPDF, '合格投资者资产证明一览表.pdf')}>
                    <img class="w-5 h-5" src={iconAttachment} alt="附件" />
                    <div class="font-color-colorRed">合格投资者资产证明一览表</div>
                  </div>
              </div>
            </div>
            <div class="p-4 mb-4 w-full min-h-152px mb-4" style={{ background: 'linear-gradient(180deg, #FFF8F8 0%, #FFEEEE 100%)' }}>
              <div class="text-base font-color-colorText font-bold mb-6">基金管理平台</div>
              <div class="font-h5 font-color-colorTextSecondary text-center">
                <div>基金管理平台</div>
                <div>（域名）</div>
              </div>
            </div>
          </div>
        ) : (
          <div class="w-full px-80 py-24">
            <div class="font-h4 font-color-colorText text-left mb-6">投资者服务</div>
            <div class="flex justify-between w-full">
              <div
                class={`${serviceBoxClass}`}
                style={{ background: 'linear-gradient(180deg, #F4F9FF 0%, #EEF6FF 100%)' }}
              >
                <div class="font-h6 font-color-colorText mb-4">什么是合格投资者？</div>
                <div class="font-h8 font-color-colorTextSecondary">
                  <div class="mb-2">
                    根据中国证监会《私募投资基金监督管理暂行办法》及相关法规，合格投资者的认定标准为：
                  </div>
                  <div class="mb-2">1、最近3年个人年均收入≥50万元或金融资产≥300万元的个人；</div>
                  <div>2、净资产≥1000万元的机构或企业。</div>
                </div>
              </div>
              <div
                class={`${serviceBoxClass}`}
                style={{ background: 'linear-gradient(180deg, #F7F8FF 0%, #EEF0FF 100%)' }}
              >
                <div class="font-h6 font-color-colorText mb-4">如何证明合格投资者身份？</div>
                <div class="font-h8 font-color-colorTextSecondary">
                  <div class="mb-2 font-bold">个人投资者</div>
                  <div class="mb-2">提供附带盖章的收入或资产证明文件材料</div>
                  <div class="mb-2 font-bold">机构投资者</div>
                  <div class="mb-5">提供最近一年的机构审计报告或财务报表</div>
                  <div class="flex items-center" onClick={() => handleDownloadPDF(investorPDF, '合格投资者资产证明一览表.pdf')}>
                    <img class="w-5 h-5" src={iconAttachment} alt="附件" />
                    <div class="font-color-colorRed">合格投资者资产证明一览表</div>
                  </div>
                </div>
              </div>
              <div
                class={`${serviceBoxClass}`}
                style={{ background: 'linear-gradient(180deg, #FFF8F8 0%, #FFEEEE 100%)' }}
              >
                <div class="font-h6 font-color-colorText mb-8">基金管理平台</div>
                <div class="font-h8 font-color-colorTextSecondary text-center">
                  <div class="mb-2">基金管理平台</div>
                  <div>（域名）</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
})
