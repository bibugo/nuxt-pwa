<template>
  <v-dialog
    v-model="dialog"
    persistent
    :max-width="options.width ? options.width : 290"
  >
    <v-card>
      <v-card-title class="subtitle-1"> {{ options.message }} </v-card-title>
      <v-card-text v-if="options.text"> {{ options.text }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary darken-1" text @click="cancel"> 否 </v-btn>
        <v-btn color="primary darken-1" text @click="confirm"> 是 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
    
<script>
export default {
  props: ["value"],
  data: () => ({
    dialog: false,
    options: {},
    defaults: {},
    resolve: null,
    reject: null,
  }),
  computed: {
    textValue: {
      get: function () {
        return this.value;
      },
      set: function (val) {
        this.$emit("input", val);
      },
    },
  },
  created() {
    this.$nuxt.$on("popup-dialog", (options, resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.options = Object.assign({}, this.defaults, options);
      this.dialog = true;
    });
  },
  methods: {
    confirm: function () {
      this.dialog = false;
      this.resolve({ action: "confirm" });
    },
    cancel: function () {
      this.dialog = false;
      this.resolve(false);
    },
  },
};
</script>