<template>
  <el-header class="navbar">
    <div class="hamburger-container" @click="handleMenuCollapse">
      <template v-if="collapse">
        <el-icon :size="20"><expand /></el-icon>
      </template>
      <template v-else>
        <el-icon :size="20"><fold /></el-icon>
      </template>
    </div>
    <div class="right-menu">
      <el-dropdown>
        <el-icon :size="16" style="margin-right: 7px;"><setting /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span>王小虎</span>
    </div>
  </el-header>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { Expand, Fold, Setting } from '@element-plus/icons';
import isCollapse from './Sidebar/collapse';

export default defineComponent({
  components: {
    Expand,
    Fold,
    Setting
  },
  setup() {
    const { collapse } = toRefs(isCollapse);

    function handleMenuCollapse() {
      isCollapse.collapse = !collapse.value;
    }

    return {
      collapse,
      handleMenuCollapse
    };
  }
});
</script>

<style lang="scss" scoped>
.navbar {
  // height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 60px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    [class^=el-icon-] {
      font-size: 24px;
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
