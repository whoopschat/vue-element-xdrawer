declare module "vue-power-show" {

    interface DrawerOptions {
        /** 标题 */
        title: string,
        /** 组件 */
        component: any,
        /** 刷新事件 */
        refresh?: Function,
        /** 编辑模式 */
        editable?: boolean,
        /** 编辑模式提示文案 */
        editableText?: string,
        /** Params参数 */
        params?: any,
        /** Query参数 */
        query?: any;
    }

    /**
     * 初始化组件
     * @param vue 对象
     */
    function install(vue: any): void;

    /**
     * 关闭页面
     */
    function closeDrawer(): void;

    /**
     * 刷新页面
     */
    function refreshDrawer(): void;

    /**
     * 返回页面
     */
    function backDrawer(): void;

    /**
     * 打开页面
     * @param options 页面参数
     */
    function openDrawer(options: DrawerOptions): void;

}