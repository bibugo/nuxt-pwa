<template>
  <v-container fluid fill-height align-start pa-0>
    <v-row no-gutters :class="{ 'fill-height': $vuetify.breakpoint.mdAndUp }">
      <v-divider
        v-if="!!$slots['right-col']"
        class="order-last"
        style="flex-basis: 100%"
        :vertical="$vuetify.breakpoint.mdAndUp"
      />
      <v-col
        v-if="!!$slots['right-col']"
        class="pa-2 col-12 col-md-3 col-xl-2 order-last"
        :style="`height: ${
          $vuetify.breakpoint.mdAndUp ? '100%' : 'auto'
        }; overflow-y: auto;`"
      >
        <slot name="right-col"></slot>
      </v-col>
      <v-col
        v-if="!!$slots['left-col']"
        class="pa-2 col-12 col-md-3 col-xl-2"
        :style="`height: ${
          $vuetify.breakpoint.mdAndUp ? '100%' : 'auto'
        }; overflow-y: auto;`"
      >
        <slot name="left-col"></slot>
      </v-col>
      <v-divider
        v-if="!!$slots['left-col']"
        style="flex-basis: 100%"
        :vertical="$vuetify.breakpoint.mdAndUp"
      />
      <v-col
        :class="`pa-2 col-12 col-md-${mdcols} col-xl-${xlcols}`"
        :style="`height: ${
          $vuetify.breakpoint.mdAndUp ? '100%' : 'auto'
        }; overflow-y: auto;`"
      >
        <slot></slot>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  computed: {
    mdcols: function() {
      let cols = 12;
      if(!!this.$slots['left-col']) cols -= 3;
      if(!!this.$slots['right-col']) cols -= 3;
      return cols
    },
    xlcols: function() {
      console.log(this.$slots)
      let cols = 12;
      if(!!this.$slots['left-col']) cols -= 2;
      if(!!this.$slots['right-col']) cols -= 2;
      return cols
    },
  },
};
</script>