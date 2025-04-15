import { watch } from "vue"
import type { PanelModule, PanelBasicModule } from "../type"
// 小模块面板
export function renderPanel(params: PanelModule) {
    const { title, content, more, type, panelClass, loading } = params
    // watch(()=>loading, (curV) => {
    //     console.log("curV=====",curV);
        
    // })
    return (<div class={['bg-module', panelClass, type == 'default' ? 'pt-3 pl-4' : 'pt-2 pl-3']}>
        <div class='flex justify-between items-center'>
            <div class={type == 'default' ? 'font-h8 leading-5' : 'font-h6'}>
                {typeof title == 'function' ? title() : title}
            </div>
            <div class='cursor-pointer'>{more?.()}</div>
        </div>
        {content?.()}
    </div>)
}

// 大模块面板
export function renderBasicPanel(params: PanelBasicModule) {
    const { title, content, more, panelClass } = params
    return (<div class={[panelClass]}>
        <div class='font-h6'>{title}</div>
        <div class='bg-module mt-2'>{content?.()}</div>
    </div>)
}