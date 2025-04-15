export type PanelType = 'default' | 'large'
export interface PanelBasicModule {
    title: string | (() => void),
    content: (() => void),
    more?: (() => void),
    panelClass?: string
}
export interface PanelModule extends PanelBasicModule{
    type?: PanelType,
    loading?: boolean,
} 
