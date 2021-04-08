<template>
  <common-edit-tree
    filterable
    v-model="items"
    title="组织架构"
    fixed-id="1"
    @select="onSelect"
    @save="onSave"
    @remove="onRemove"
  ></common-edit-tree>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        id: "1",
        name: "极火科技",
        children: [
          { id: "2", name: "市场部" },
          { id: "3", name: "销售部" },
          {
            id: "4",
            name: "行政中心",
            children: [
              { id: "5", name: "后勤部" },
              { id: "6", name: "人力资源部" },
            ],
          },
        ],
      },
    ],
  }),
  methods: {
    onSelect: function (item) {
      console.log("select", item);
    },
    onSave: function (item) {
      console.log("save", item);
    },
    onRemove: function (item) {
      console.log("remove", item);
    },
  },
};
</script>