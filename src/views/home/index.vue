<template>
  <div class="wellcome">home page</div>
  <div>
    <el-button type="primary" @click="onShowMsg">show message</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';

export default defineComponent({
  name: 'Index',
  setup() {
    function onShowMsg() {
      ElMessage({
        message: 'this is a message',
        type: 'success',
        duration: 2000
      });
    }

    return {
      onShowMsg
    };
  }
});
</script>

<style lang="scss">
  .wellcome {
    padding: 200px 0;
    text-align: center;
  }
</style>
