<template>
  <container-flex
    padding-container="0"
    paddingContent="0"
    leftWidth="256"
    title="|内部邮件"
    dense
  >
    <template v-slot:append-head>
      <v-row no-gutters style="height: 56px">
        <v-col style="min-width: 256px" class="flex-grow-0"> </v-col>
        <v-col class="pt-1 ml-n3">
          <v-toolbar dense flat>
            <v-select
              :items="['全部', '无', '已读', '未读', '已加星标', '未加星标']"
              solo
              dense
              flat
              hide-details
              :menu-props="{ 'offset-y': true }"
              style="max-width: 88px"
            >
              <template v-slot:prepend-inner>
                <v-checkbox
                  hide-details
                  class="shrink"
                  @click.stop=""
                ></v-checkbox>
              </template>
              <template v-slot:selection> </template>
            </v-select>
            <v-btn icon>
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field
              label="搜索邮件"
              prepend-inner-icon="mdi-magnify"
              style="max-width: 260px"
              hide-details
              single-line
              outlined
              dense
            ></v-text-field>
          </v-toolbar>
        </v-col>
      </v-row>
      <v-divider />
    </template>
    <template v-slot:left-col>
      <v-btn rounded color="primary" class="mt-2 ml-4 mb-0">
        <v-icon left> mdi-pencil </v-icon> 写邮件
      </v-btn>
      <v-list dense shaped>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item to="/mail">
            <v-list-item-icon>
              <v-icon>mdi-inbox</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>收件箱</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-star-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>已加星标</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-send-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>已发邮件</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>已删除邮件</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-subheader>标签</v-subheader>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </template>
    <nuxt-child />
  </container-flex>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 0,
    items: [
      { text: "重要", icon: "mdi-bookmark-outline" },
      { text: "动态", icon: "mdi-information-outline" },
      { text: "待办", icon: "mdi-clock-time-four-outline" },
    ],
  }),
};
</script>
