<template>
  <el-container class="app-wrapper">
    <Sidebar />
    <el-container class="main-container" direction="vertical">
      <Navbar />
      <el-main>
        <router-view :key="$route.fullPath"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar/index.vue';

export default defineComponent({
  name: 'Layout',
  components: {
    Sidebar,
    Navbar
  }
});
</script>

<style lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
