<template>
  <v-scroll-y-reverse-transition group>
    <v-snackbar
      v-for="(s, i) in snackbars"
      :key="i"
      top
      timeout="-1"
      :color="s.color"
      :style="{ 'margin-top': calcMargin(i) }"
      :value="keys[s.key]"
      :ref="'snackbar-' + s.key"
    >
      <v-alert class="ma-0" dense :type="s.color">
        {{ s.content }}
      </v-alert>

      <template v-slot:action="{ attrs }">
        <v-btn icon small v-bind="attrs" @click.native="close(s.key)">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-scroll-y-reverse-transition>
</template>

<script>
export default {
  data: () => ({
    snackbars: [],
    keys: [],
  }),
  created() {
    this.$nuxt.$on("show-snackbar", (snackbar) => {
      let key = this.snackbars.length + "-" + Date.now();
      this.snackbars.push(Object.assign(snackbar, { key: key }));
      this.keys[key] = true;
      setTimeout(
        () => {
          this.close(key);
        },
        snackbar.timeout ? snackbar.timeout : 3000
      );
    });
  },
  methods: {
    calcMargin(i) {
      return i * 60 + "px";
    },
    close(key) {
      delete this.keys[key];
      this.$nextTick(function () {
        let idx = this.snackbars.findIndex((s) => s.key === key);
        this.snackbars.splice(idx, 1);
      });
    },
  },
};
</script>