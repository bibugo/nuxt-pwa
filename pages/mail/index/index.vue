<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    hide-default-header
    show-select
    class="elevation-0 row-pointer"
    @click:row="view"
  >
    <template v-slot:[`item.star`]="{ item }">
      <v-btn :class="{ 'orange--text text--lighten-2': item.star }" icon>
        <v-icon v-text="item.star ? 'mdi-star' : 'mdi-star-outline'"></v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { value: "star" },
      {
        align: "start",
        value: "sender",
      },
      { value: "title" },
      { value: "date" },
    ],
    desserts: [
      {
        star: true,
        sender: "Sonetel",
        title: "Save 30% on your next purchase",
        date: "3月18日",
        id: "12345678",
      },
      {
        sender: "Google Cloud Platform",
        title:
          "Updates to the Google Cloud Platform Third-Party Subprocessors list",
        date: "3月21日",
      },
      {
        star: true,
        sender: "GitHub",
        title: "[GitHub] Deprecation Notice",
        date: "3月28日",
      },
      {
        sender: "Sonetel",
        title: "Save 30% on your next purchase",
        date: "3月28日",
      },
      {
        sender: "Sonetel",
        title: "Save 30% on your next purchase",
        date: "3月28日",
      },
      {
        sender: "Sonetel",
        title: "Save 30% on your next purchase",
        date: "3月28日",
      },
      {
        sender: "Sonetel",
        title: "Save 30% on your next purchase",
        date: "3月28日",
      },
      {
        sender: "Sonetel",
        title: "Save 30% on your next purchase",
        date: "3月28日",
      },
    ],
  }),
  methods: {
    view: function (item, opts) {
      this.$router.push("/mail/view/123456");
    },
  },
};
</script>

<style lang="css" scoped>
.row-pointer >>> tbody tr:hover {
  cursor: pointer;
}
</style>