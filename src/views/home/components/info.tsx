import { defineComponent } from "vue";
import { Row, Col } from "ant-design-vue";
import { SwapRightOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    setup(props, ctx) {
        const list = [
            {
                title: '公司简介',
                cont: '易方达瑞祺灵活配置混合型证券投资基金易方达瑞祺灵活配置混合型证券投资基金易方达瑞祺灵…易方达瑞祺灵活配置混合型证券投资基金易方达瑞祺灵活配置混合型证券投资基金易方达瑞祺灵…',
                time: '3月14日  2025',
            }, {
                title: '公司简介',
                cont: '易方达瑞祺灵活配置混合型证券投资基金易方达瑞祺灵活配置混合型证券投资基金易方达瑞祺灵…易方达瑞祺灵活配置混合型证券投资基金易方达瑞祺灵活配置混合型证券投资基金易方达瑞祺灵…',
                time: '3月14日  2025',
            },
        ]
        return () => <div class='container'>
            <div class='font-h3 font-500 pt-24 pb-8 text-center'>信息披露</div>
            <Row gutter={16}>
                {
                    list.map((item, index) => {
                        return <Col span={6}>
                            <div class='p-5 group bg-[#F5F5F5] hover:bg-[#C1272D]
                             cursor-pointer rounded-sm'>
                                <div title={item.title}
                                    class='group-hover:color-[#fff]/88 font-h6 font-500 truncate'>{item.title}</div>
                                <div class='group-hover:color-[#fff]/88 pt-2 font-h7 color-secondary line-clamp-2'>{item.cont}</div>
                                <div class='group-hover:color-[#fff]/88 color-secondary flex justify-between items-center pt-6'>
                                    <div>
                                        <SwapRightOutlined class='hidden group-hover:block' />
                                    </div>
                                    <div class='font-h7 text-right'>{item.time}</div>
                                </div>
                            </div>
                        </Col>
                    })
                }
            </Row>
            <div class='font-h7 text-center color-primary1 mt-16 mb-12'>
                <span class='inline-block cursor-pointer w-24 h-8 leading-8'>
                    了解更多
                </span>
            </div>
        </div>
    }
})