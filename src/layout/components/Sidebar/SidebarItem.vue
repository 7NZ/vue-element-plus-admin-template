<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- <i :class="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"></i>-->
          <el-icon><component :is="iconMap[onlyOneChild.meta.icon||(item.meta&&item.meta.icon)]"></component></el-icon>
          <template #title>{{onlyOneChild.meta.title}}</template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)">
      <template #title>
        <!-- <i :class="item.meta.icon||(item.meta&&item.meta.icon)"></i> -->
        <el-icon><component :is="iconMap[item.meta.icon]"></component></el-icon>
        <span>{{item.meta.title}}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue';
import path from 'path-browserify';
import { isExternal } from '@/utils/validate';
import AppLink from './Link.vue';
import type { RouteConfig } from '@/router/index';
import iconMap from './iconMap';

export default defineComponent({
  name: 'SidebarItem',
  components: {
    AppLink
  },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { basePath } = toRefs(props);
    const onlyOneChild = computed(() => {
      let routeObj: any = {};
      const routeItem = props.item;
      let showingChildren = [];
      if (routeItem.children) {
        showingChildren = (routeItem.children as RouteConfig[]).filter(item => !item.hidden);
      }
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        routeObj = routeItem.children[0];
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        routeObj = { ... routeItem, path: '', noShowingChildren: true };
      }
      return routeObj;
    });

    function hasOneShowingChild(children: RouteConfig[]) {
      if (children) {
        const showingChildren = children.filter(item => !item.hidden);
        return !(showingChildren.length > 1);
      }
      // return true if there are no child router, for nest routes, it's the deepest routes
      return true;
    }

    function resolvePath(routePath:string) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(basePath.value)) {
        return basePath.value;
      }
      return path.resolve(basePath.value, routePath);
    }

    return {
      onlyOneChild,
      hasOneShowingChild,
      resolvePath,
      iconMap
    };
  }
});
</script>
