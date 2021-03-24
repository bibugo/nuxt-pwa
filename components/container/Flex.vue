<template>
  <v-container
    fluid
    class="d-flex flex-column flex-grow-1"
    :class="`pa-${pa || 4}`"
    style="min-height: 100%; background-color: rgba(0, 0, 0, 0.08)"
  >
    <v-toolbar flat class="mb-2 transparent flex-grow-0" :hidden="false">
      <v-divider class="ml-n4 mr-4" vertical></v-divider>
      <div class="d-flex flex-column">
        <v-toolbar-title>用户管理</v-toolbar-title>
        <v-breadcrumbs class="pa-0" :items="items"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="primary">Append</v-btn>
    </v-toolbar>
    <v-alert
      dismissible
      border="right"
      colored-border
      type="error"
      elevation="0"
      transition="scale-transition"
      :value="true"
    >
      Fusce commodo aliquam arcu. Pellentesque posuere. Phasellus tempus. Donec
      posuere vulputate arcu.
    </v-alert>
    <v-row
      no-gutters
      :class="{ 'flex-column': !$vuetify.breakpoint.mdAndUp }"
      style="flex-wrap: nowrap;"
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
        ]"
        class="flex-grow-0 flex-shrink-0 white pa-2"
        :class="{ 'rounded-lg': !dense }"
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
              ($vuetify.breakpoint.mdAndUp && (dense ? '1px' : '16px')) || '',
          },
          {
            'margin-bottom':
              (!$vuetify.breakpoint.mdAndUp && (dense ? '' : '16px')) || '',
          },
        ]"
      />
      <v-col
        style="max-width: 100%"
        class="white pa-2 flex-shrink-0"
        :class="[
          { 'rounded-lg': !dense },
          $vuetify.breakpoint.mdAndUp ? 'flex-grow-1' : 'flex-grow-0',
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
        ]"
        class="flex-grow-0 flex-shrink-1 white pa-2"
        :class="{ 'rounded-lg': !dense }"
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
    pa: { type: String },
    leftWidth: { type: String },
    rightWidth: { type: String },
  },
  data: () => ({
    items: [
      {
        text: "Dashboard",
        disabled: false,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Link 1",
        disabled: false,
        href: "breadcrumbs_link_1",
      },
      {
        text: "Link 2",
        disabled: true,
        href: "breadcrumbs_link_2",
      },
    ],
  }),
};
</script>
