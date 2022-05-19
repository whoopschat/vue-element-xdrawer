import drawer from "./drawer.vue";

let _inited = false;
let _showDrawer = null;
let _closeDrawer = null;
let _refreshDrawer = null;
let _backDrawer = null;

function _initDrawer(vue) {
    if (_inited) {
        return;
    }
    _inited = true;
    const comp = vue.extend(drawer);
    const instance = new comp();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);
    _showDrawer = function (options) {
        instance.showDrawer(options);
    }
    _backDrawer = function () {
        instance.backDrawer(true);
    }
    _closeDrawer = function () {
        instance.closeDrawer();
    }
    _refreshDrawer = function () {
        instance.setRefresh();
    }
}

function openDrawer(drawerParams) {
    _showDrawer && _showDrawer(drawerParams);
}

function closeDrawer() {
    _closeDrawer && _closeDrawer();
}

function backDrawer() {
    _backDrawer && _backDrawer();
}

function refreshDrawer() {
    _refreshDrawer && _refreshDrawer();
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

function install(vue) {
    _initDrawer(vue);
    vue.prototype.$drawer = {
        backDrawer,
        closeDrawer,
        refreshDrawer,
        openDrawer,
    };
}

export default {
    install,
    backDrawer,
    closeDrawer,
    refreshDrawer,
    openDrawer,
}
