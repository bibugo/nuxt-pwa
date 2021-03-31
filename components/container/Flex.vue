<template>
  <v-container
    fluid
    class="d-flex flex-column flex-grow-1"
    :class="`pa-${paddingContainer || 4}`"
    style="min-height: 100%; background-color: rgba(0, 0, 0, 0.08)"
    :style="{
      height: $vuetify.breakpoint.mdAndUp && autoOverflow ? '100%' : '',
    }"
  >
    <v-toolbar
      v-if="title || $slots['title-append']"
      flat
      dense
      :class="[{'mb-3': crumbs && crumbs.length > 0},'transparent', 'flex-grow-0']"
    >
      <v-divider v-if="title && crumbs && crumbs.length > 0" class="ml-n4 mr-4" vertical></v-divider>
      <div class="d-flex flex-column">
        <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
        <v-breadcrumbs class="pa-0" :items="crumbs"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <slot name="append-title"></slot>
    </v-toolbar>
    <v-sheet v-if="$slots['append-head']" class="flex-grow-0">
      <slot name="append-head"></slot>
    </v-sheet>
    <v-alert
      dismissible
      border="right"
      colored-border
      type="error"
      elevation="0"
      transition="scale-transition"
      :value="false"
    >
      Fusce commodo aliquam arcu. Pellentesque posuere. Phasellus tempus. Donec
      posuere vulputate arcu.
    </v-alert>
    <v-row
      no-gutters
      :class="[{ 'flex-column': !$vuetify.breakpoint.mdAndUp }]"
      style="flex-wrap: nowrap"
      :style="{
        height: $vuetify.breakpoint.mdAndUp && autoOverflow ? '0' : '',
      }"
    >
      <v-col
        v-if="$slots['left-col']"
        :cols="`${$vuetify.breakpoint.mdAndUp ? 3 : 12}`"
        :style="[
          {
            'min-width':
              ($vuetify.breakpoint.mdAndUp && leftWidth && leftWidth + 'px') ||
              '',
          },
          {
            'max-width':
              ($vuetify.breakpoint.mdAndUp && leftWidth && leftWidth + 'px') ||
              '',
          },
          { height: $vuetify.breakpoint.mdAndUp && autoOverflow ? '100%' : '' },
          {
            overflow: $vuetify.breakpoint.mdAndUp && autoOverflow ? 'auto' : '',
          },
        ]"
        class="flex-grow-0 flex-shrink-1 col-background"
        :class="[
          paddingContent ? 'pa-' + paddingContent : 'pa-2',
          { 'rounded-lg': !dense },
        ]"
      >
        <slot name="left-col"> </slot>
      </v-col>
      <v-divider
        v-if="$slots['left-col']"
        :vertical="$vuetify.breakpoint.mdAndUp"
        :style="[
          { border: !dense ? 'none' : '' },
          {
            'margin-right':
              ($vuetify.breakpoint.mdAndUp && (dense ? '0' : '16px')) || '',
          },
          {
            'margin-bottom':
              (!$vuetify.breakpoint.mdAndUp && (dense ? '' : '16px')) || '',
          },
        ]"
      />
      <v-col
        style="max-width: 100%"
        :style="[
          { height: $vuetify.breakpoint.mdAndUp && autoOverflow ? '100%' : '' },
          {
            overflow: $vuetify.breakpoint.mdAndUp && autoOverflow ? 'auto' : '',
          },
        ]"
        class="flex-shrink-0 col-background"
        :class="[
          paddingContent ? 'pa-' + paddingContent : 'pa-2',
          { 'rounded-lg': !dense },
          $vuetify.breakpoint.mdAndUp ||
          !($slots['left-col'] || $slots['right-col'])
            ? 'flex-grow-1'
            : 'flex-grow-0',
        ]"
      >
        <slot></slot>
      </v-col>
      <v-divider
        v-if="$slots['right-col']"
        :vertical="$vuetify.breakpoint.mdAndUp"
        :style="[
          { border: !dense ? 'none' : '' },
          {
            'margin-right':
              ($vuetify.breakpoint.mdAndUp && (dense ? '1px' : '16px')) || '',
          },
          {
            'margin-bottom':
              (!$vuetify.breakpoint.mdAndUp && (dense ? '' : '16px')) || '',
          },
        ]"
      />
      <v-col
        v-if="$slots['right-col']"
        :cols="`${$vuetify.breakpoint.mdAndUp ? 3 : 12}`"
        :style="[
          {
            'min-width':
              ($vuetify.breakpoint.mdAndUp &&
                rightWidth &&
                rightWidth + 'px') ||
              '',
          },
          {
            'max-width':
              ($vuetify.breakpoint.mdAndUp &&
                rightWidth &&
                rightWidth + 'px') ||
              '',
          },
          { height: $vuetify.breakpoint.mdAndUp && autoOverflow ? '100%' : '' },
          {
            overflow: $vuetify.breakpoint.mdAndUp && autoOverflow ? 'auto' : '',
          },
        ]"
        class="flex-grow-0 flex-shrink-1 col-background"
        :class="[
          paddingContent ? 'pa-' + paddingContent : 'pa-2',
          { 'rounded-lg': !dense },
        ]"
      >
        <slot name="right-col"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    dense: { type: Boolean },
    autoOverflow: { type: Boolean },
    paddingContainer: { type: String },
    paddingContent: { type: String },
    leftWidth: { type: String },
    rightWidth: { type: String },
    title: { type: String },
  },
  computed: {
    crumbs: function () {
      if (!this.title) return [];
      const titles = this.title.split(",");
      this.pageTitle = titles[titles.length - 1];
      const crumbs = [];
      if (titles.length > 1) {
        let path = "";
        this.$route.fullPath.split("/").forEach((name, i) => {
          if (i > 0) {
            path += "/" + name;
            if (i <= titles.length && titles[i - 1]) {
              crumbs.push({
                text: titles[i - 1],
                href: path,
                disabled: this.$route.fullPath === path ? true : false,
              });
            }
          }
        });
      }
      return crumbs;
    },
  },
  data: () => ({
    pageTitle: "",
  }),
};
</script>

<style scoped>
.theme--dark .col-background {
  background-color: var(--v-background-base, #1e1e1e) !important;
}
.theme--light .col-background {
  background-color: var(--v-background-base, white) !important;
}
</style>
