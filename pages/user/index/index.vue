<template>
  <v-container fluid pa-0>
    <v-tabs grow>
      <v-tab href="#mobile-tabs-5-1" class="primary--text">
        <v-icon>mdi-account-search-outline</v-icon>
      </v-tab>
      <v-tab href="#mobile-tabs-5-2" class="primary--text">
        <v-icon>mdi-account-group-outline</v-icon>
      </v-tab>
      <v-tab href="#mobile-tabs-5-3" class="primary--text">
        <v-icon>mdi-sitemap</v-icon>
      </v-tab>
      <v-tab href="#mobile-tabs-5-4" class="primary--text">
        <v-icon>mdi-badge-account-horizontal-outline</v-icon>
      </v-tab>
    </v-tabs>
    <v-simple-table dense class="my-8 v-sheet v-sheet--outlined rounded-0">
      <template v-slot:default>
        <tbody>
          <tr v-for="(item, index) in groups" :key="item.id">
            <v-hover v-slot="{ hover }">
              <td
                style="position: relative; height: 39px"
                @click="groupSelect(index)"
              >
                {{ item.name }}
                <div
                  v-if="hover"
                  class="d-flex mx-4 align-center justify-end"
                  style="
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                  "
                >
                  <v-btn
                    icon
                    x-small
                    class="mr-2"
                    @click.stop="groupInsert(index)"
                    ><v-icon>mdi-plus-outline</v-icon></v-btn
                  >
                  <v-btn icon x-small class="mr-2" @click.stop=""
                    ><v-icon>mdi-pencil-outline</v-icon></v-btn
                  >
                  <v-btn
                    icon
                    x-small
                    class="mr-1"
                    @click.stop="groupRemove(index)"
                    ><v-icon>mdi-trash-can-outline</v-icon></v-btn
                  >
                </div>
                <div
                  v-if="index == 0"
                  class="d-flex align-center justify-end"
                  style="
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                  "
                >
                  <v-text-field
                    :value="item.name"
                    solo
                    flat
                    dense
                    hide-details
                    class="rounded-0 pl-1"
                    style="font-size: 0.875rem"
                    @click.stop
                  >
                    <template v-slot:append>
                      <v-btn
                        icon
                        x-small
                        class="mr-2"
                        color="error"
                        @click.stop=""
                        ><v-icon>mdi-close-thick</v-icon></v-btn
                      >
                      <v-btn
                        icon
                        x-small
                        class="mr-2"
                        color="success"
                        @click.stop=""
                        ><v-icon>mdi-check-bold</v-icon></v-btn
                      >
                    </template>
                  </v-text-field>
                </div>
              </td>
            </v-hover>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn block depressed class="primary">添加群组</v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    editIndex: -1,
    groups: [
      { id: "aaa", name: "系统管理员" },
      { id: "bbb", name: "项目管理员" },
      { id: "ccc", name: "部门管理员" },
    ],
  }),
  methods: {
    groupSelect(index) {
      console.log("select", index);
    },
    groupRemove(index) {
      this.groups.splice(index, 1);
    },
    groupInsert(index) {
      this.groups.splice(index, 0, { id: "", name: "" });
    },
  },
};
</script>