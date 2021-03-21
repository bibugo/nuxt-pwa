<template>
  <v-container fluid pa-0>
    <v-row no-gutters>
      <v-navigation-drawer
        v-if="!isRight"
        absolute
        :floating="isFloating"
        :width="sidebarWidth"
        :value="isShow"
        :height="sidebarHeight"
        style="min-height: 100%"
      >
        <template v-slot:prepend v-if="$slots['sidebar-prepend']">
          <slot name="sidebar-prepend"></slot>
        </template>
        <slot name="sidebar"> </slot>
      </v-navigation-drawer>
      <v-col
        class="flex-grow-1 pa-2"
        :style="
          isShow
            ? `padding-${isRight ? 'right' : 'left'}: ${
                sidebarWidth + 8
              }px !important;`
            : ''
        "
      >
        <slot name="default"></slot>
      </v-col>
      <v-navigation-drawer
        v-if="isRight"
        absolute
        right
        :floating="isFloating"
        :width="sidebarWidth"
        :value="isShow"
        :height="sidebarHeight"
        style="min-height: 100%"
      >
        <template v-slot:prepend v-if="$slots['sidebar-prepend']">
          <slot name="sidebar-prepend"></slot>
        </template>
        <slot name="sidebar"> </slot>
      </v-navigation-drawer>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["sideWidth", "sideHeight", "floating", "right"],
  data: () => ({}),
  computed: {
    isShow: function () {
      return this.$vuetify.breakpoint.lgAndUp;
    },
    isRight: function () {
      return this.right || this.right === "";
    },
    isFloating: function () {
      return this.floating || this.floating === "" || this.isRight;
    },
    sidebarWidth: function () {
      return parseInt(this.sideWidth) || 256;
    },
    sidebarHeight: function () {
      return this.sideHeight || (this.isRight ? 'auto' : '100%');
    },
  },
};
</script>
