<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="desserts"
    item-key="id"
    show-select
    hide-default-header
    class="elevation-0 row-pointer fix-hidden-header"
    @click:row="view"
  >
    <template v-slot:[`item.starred`]="{ item }">
      <v-btn :class="{ 'orange--text text--lighten-2': item.starred }" icon>
        <v-icon
          v-text="item.starred ? 'mdi-star' : 'mdi-star-outline'"
        ></v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    selected: [],
    headers: [
      { value: "starred", sortable: false, width: "36px" },
      {
        align: "start",
        value: "sender",
      },
      { value: "title" },
      { value: "date" },
    ],
    desserts: [
      {
        starred: true,
        sender: "欧康江伟熙",
        title: "关于2021年清明节放假的通知",
        date: "3月23日",
        id: "123456780",
      },
      {
        sender: "中国移动139邮箱",
        title: "139邮箱2月数据账单",
        date: "3月23日",
        id: "123456781",
       },
      {
        starred: true,
        sender: "何文彬",
        title: "2021年车辆信息收集_技术发展部",
        date: "3月28日",
        id: "123456782",
       },
      {
        sender: "Sonetel",
        title: "Save 30% on your next purchase",
        date: "3月28日",
        id: "123456783",
       },
      {
        sender: "Sonetel",
        title: "Save 30% on your next purchase",
        date: "3月28日",
        id: "123456784",
      },
      {
        sender: "Sonetel",
        title: "Save 30% on your next purchase",
        date: "3月28日",
        id: "123456785",
       },
      {
        sender: "Sonetel",
        title: "Save 30% on your next purchase",
        date: "3月28日",
        id: "123456786",
      },
      {
        sender: "Sonetel",
        title: "Save 30% on your next purchase",
        date: "3月28日",
        id: "123456787",
       },
    ],
  }),
  watch: {
    selected: function (val) {
      console.log(val);
    },
  },
  methods: {
    view: function (item, opts) {
      this.$router.push("/mail/view/" + item.id);
    },
  },
};
</script>

<style lang="css" scoped>
.row-pointer >>> tbody tr:hover {
  cursor: pointer;
}
.fix-hidden-header >>> tbody > tr:first-child > td:nth-child(1),
.fix-hidden-header >>> tbody > tr:first-child > td:nth-child(2) {
  width: 1px;
  min-width: 1px;
}
</style>