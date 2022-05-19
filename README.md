# vue-element-xdrawer
> vue x drawer with element-ui


## Getting started
* make sure node and npm installed;

### Install
```
> npm install vue-element-xdrawer
```

### Usage
##### main.js
```javascript
import vue from 'vue';
import ElementUI from 'element-ui';
import XDrawer from 'vue-element-xdrawer';

// install
vue.use(elementUi);
vue.use(XDrawer);
```

##### app.vue
```vue
<script>
import test from "./test.vue";

export default {
  methods: {
    showDrawer() {
      this.$drawer.openDrawer({
        title: "测试",
        component: test
      });
    }
  }
};
</script>
```

## Development
* make sure node and npm installed;
* clone the repo to local;
* run `npm install` to install node modules;
* run `npm run build` to get an *unminified* build file at `lib` folder;