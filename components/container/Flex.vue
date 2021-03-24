<template>
  <v-container
    fluid
    class="d-flex flex-column flex-grow-1"
    :class="`pa-${pa || 4}`"
    style="min-height: 100%; background-color: rgba(0, 0, 0, 0.08)"
  >
    <v-toolbar flat class="mb-2 transparent flex-grow-0" hidden>
      <v-divider class="ml-n4 mr-4" vertical></v-divider>
      <div class="d-flex flex-column">
        <v-toolbar-title>用户管理</v-toolbar-title>
        <v-breadcrumbs class="pa-0" :items="items"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="primary">Append</v-btn>
    </v-toolbar>
    <v-alert
      dense
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
      class="fill-height"
      :class="{ 'flex-column': !$vuetify.breakpoint.mdAndUp }"
      style="flex-wrap: nowrap"
    >
      <v-col
        v-if="$slots['left-col']"
        :cols="`${$vuetify.breakpoint.mdAndUp ? 3 : 12}`"
        :style="`${
          $vuetify.breakpoint.mdAndUp &&
          this.leftWidth &&
          'min-width: ' +
            this.leftWidth +
            'px;max-width: ' +
            this.leftWidth +
            'px;'
        }`"
        class="flex-grow-0 flex-shrink-0 white pa-2"
        :class="{ 'rounded-lg': !isDense }"
      >
        <slot name="left-col"> </slot>
      </v-col>
      <v-divider
        v-if="$slots['left-col']"
        :vertical="$vuetify.breakpoint.mdAndUp"
        :style="dividerStyle"
      />
      <v-col
        style="max-width: 100%"
        class="white pa-2 flex-shrink-0"
        :class="[
          isDense ? '' : 'rounded-lg',
          $vuetify.breakpoint.mdAndUp ? 'flex-grow-1' : 'flex-grow-0',
        ]"
      >
        <slot></slot>
      </v-col>
      <v-divider
        v-if="$slots['right-col']"
        :vertical="$vuetify.breakpoint.mdAndUp"
        :style="dividerStyle"
      />
      <v-col
        v-if="$slots['right-col']"
        :cols="`${$vuetify.breakpoint.mdAndUp ? 3 : 12}`"
        :style="`${
          $vuetify.breakpoint.mdAndUp &&
          this.rightWidth &&
          'min-width: ' +
            this.rightWidth +
            'px;max-width: ' +
            this.rightWidth +
            'px;'
        }`"
        class="flex-grow-0 flex-shrink-1 white pa-2"
        :class="{ 'rounded-lg': !isDense }"
      >
        <slot name="right-col"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["dense", "left-width", "right-width", "pa"],
  mounted() {
    console.log(this.$root);
  },
  computed: {
    isDense: function () {
      return this.dense || this.dense === "";
    },
    dividerStyle: function () {
      const direction = this.$vuetify.breakpoint.mdAndUp ? "right" : "bottom";
      if (this.isDense) {
        return this.$vuetify.breakpoint.mdAndUp
          ? "margin-right: 0;"
          : "margin-top: 0;";
      } else {
        return "border: none;margin-" + direction + ": 16px;";
      }
    },
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
