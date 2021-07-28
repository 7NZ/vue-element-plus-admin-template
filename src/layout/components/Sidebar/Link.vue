<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts">
import { isExternal } from '@/utils/validate';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const type = computed(() => {
      if (isExternal(props.to)) {
        return 'a';
      }
      return 'router-link';
    });

    function linkProps(to: string) {
      if (isExternal(props.to)) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        };
      }
      return {
        to: to
      };
    }

    return {
      isExternal,
      type,
      linkProps
    };
  }
});
</script>
