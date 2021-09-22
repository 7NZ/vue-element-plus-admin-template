<template>
  <el-aside class="sidebar-container" :width="asideWidth">
    <el-menu
      :default-active="activeMenu"
      :collapse="collapse"
      :background-color="scss_variable.menuBg"
      :text-color="scss_variable.menuText"
      :unique-opened="false"
      :active-text-color="scss_variable.menuActiveText"
      :collapse-transition="false"
      router
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </el-aside>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { constantRoutes } from '@/router/index';
import SidebarItem from './SidebarItem.vue';
import isCollapse from './collapse';
import variables from '@/styles/variables.scss';

export default defineComponent({
  name: 'Sidebar',
  components: { SidebarItem },
  setup() {
    const routes = computed(() => {
      return constantRoutes.filter(route => !route.hidden);
    });
    const scss_variable = computed(() => {
      return variables;
    });
    // 当前激活的菜单，等于menu-item的index
    const activeMenu = computed(() => {
      const route = useRoute();
      const { path } = route;
      return path;
    });
    const { collapse } = toRefs(isCollapse);
    const asideWidth = computed(() => {
      return collapse.value ? 'auto' : variables.sideBarWidth;
    });

    return {
      routes,
      scss_variable,
      activeMenu,
      collapse,
      asideWidth
    };
  }
});
</script>
