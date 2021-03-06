<template>
  <div>
    <el-drawer
      append-to-body
      destroy-on-close
      :size="autoSize"
      :title="drawerTitle"
      :visible.sync="show"
      :before-close="handleClose"
      :wrapperClosable="!drawerEditable && drawerClosable"
      :modal="false"
      custom-class="xdrawer"
    >
      <template slot="title">
        <div>
          <el-page-header
            @back="backDrawer"
            :content="drawerTitle"
          ></el-page-header>
        </div>
      </template>
      <div v-if="show" ref="drawer-content">
        <div v-for="(opt, i) in historyList" :key="opt.key">
          <component
            v-show="i == historyList.length - 1"
            :is="opt.component"
            :params="opt.params"
            :query="opt.query"
          >
          </component>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="less">
.xdrawer {
  // 滚动条的宽度
  ::-webkit-scrollbar {
    width: 0px !important;
    height: 16px !important;
  }
  
  // 滚动条的滑块
  ::-webkit-scrollbar-thumb {
    background-color: #ddd !important;
  }

  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    background: #eee !important;
  }

  .el-drawer__header {
    margin-bottom: 0px !important;
    padding: 10px 15px 8px !important;
    border: 0px solid #ddd !important;
  }

  .el-drawer__body {
    -webkit-box-flex: 1 !important;
    -ms-flex: 1 !important;
    flex: 1 !important;
    overflow: auto !important;
  }

  .el-page-header__content {
    font-size: 16px !important;
    color: #303133 !important;
  }

  .el-card {
    border: 0px solid #ebeef5 !important;
  }

}
</style>

<script>
export default {
  data() {
    return {
      show: false,
      refresh: false,
      options: null,
      autoSize: "80%",
      historyList: [],
    };
  },
  created() {
    Tape.onResize(this.handleResize);
    this.handleResize();
  },
  destroyed() {
    Tape.offResize(this.handleResize);
  },
  computed: {
    currentOptions() {
      try {
        if (this.historyList.length > 0) {
          return this.historyList[this.historyList.length - 1];
        }
      } catch (error) {}
    },
    drawerTitle() {
      return this.currentOptions && this.currentOptions.title;
    },
    drawerClosable() {
      return this.currentOptions && this.currentOptions.closable !== false;
    },
    drawerEditable() {
      return this.currentOptions && this.currentOptions.editable;
    },
    drawerEditableText() {
      return (
        (this.currentOptions && this.currentOptions.editableText) ||
        "确定退出编辑模式？"
      );
    },
  },
  methods: {
    handleResize() {
      try {
        let width =
          document.documentElement.clientWidth || document.body.clientWidth;
        if (width < 1000) {
          this.autoSize = "100%";
        } else {
          this.autoSize = 1000;
        }
      } catch (error) {}
    },
    createUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    showDrawer(options = {}) {
      if (this.historyList.length > 0) {
        try {
          let opt = this.historyList[this.historyList.length - 1];
          let currentKey = `drawer-content`;
          if (this.$refs[currentKey]) {
            let parentElement = this.$refs[currentKey].parentElement;
            opt.scrollTop = (parentElement && parentElement.scrollTop) || 0;
          }
        } catch (err) {}
      }
      options.key = this.createUUID();
      options.params = options.query = Object.assign(
        { isDrawer: 1 },
        options.query || {},
        options.params || {}
      );
      this.historyList.push(options);
      this.show = true;
    },
    setRefresh() {
      this.refresh = true;
    },
    checkRefresh(option) {
      if (option && this.refresh && typeof option.refresh === "function") {
        option.refresh();
      }
    },
    closeDrawer() {
      this.historyList.splice(0, this.historyList.length).forEach((option) => {
        this.checkRefresh(option);
      });
      this.refresh = false;
      this.show = false;
    },
    backDrawer(force = false) {
      let done = () => {
        if (this.historyList.length == 1) {
          this.closeDrawer();
        } else {
          this.checkRefresh(this.historyList.pop());
          this.$nextTick(() => {
            try {
              let currentKey = `drawer-content`;
              if (this.$refs[currentKey]) {
                let parentElement = this.$refs[currentKey].parentElement;
                parentElement.scrollTop = this.currentOptions.scrollTop;
              }
            } catch (error) {}
          });
        }
      };
      if (this.drawerEditable && !force) {
        this.$confirm(this.drawerEditableText, {
          title: "提示",
          type: "info",
        })
          .then((_) => {
            done();
          })
          .catch((_) => {});
      } else {
        done();
      }
    },
    handleClose(done) {
      if (this.drawerEditable) {
        this.$confirm(this.drawerEditableText, {
          title: "提示",
          type: "info",
        })
          .then((_) => {
            this.closeDrawer();
          })
          .catch((_) => {});
      } else {
        this.closeDrawer();
      }
    },
  },
};
</script>