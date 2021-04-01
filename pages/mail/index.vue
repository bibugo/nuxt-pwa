<template>
  <container-flex
    padding-container="0"
    paddingContent="0"
    leftWidth="256"
    title="内部邮件"
    dense
  >
    <template v-slot:append-head>
      <v-row no-gutters>
        <v-col style="min-width: 256px" class="flex-grow-0"> </v-col>
        <v-col>
          <v-toolbar dense flat>
            <div class="d-flex ml-n3">
              <v-select
                v-if="action == 'list'"
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
                    v-model="selectAll"
                    hide-details
                    @click.stop=""
                  ></v-checkbox>
                </template>
                <template v-slot:selection> </template>
              </v-select>
            </div>
            <v-toolbar-items
              class="ml-n3"
              v-if="action == 'list' && selected.length == 0"
            >
              <v-btn icon>
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar-items>
            <v-toolbar-items
              class="ml-n3"
              v-if="action == 'view' || selected.length > 0"
            >
              <v-btn
                v-if="action == 'view'"
                icon
                class="mr-8 ml-2"
                @click="$router.back()"
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-email-open-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-clock-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar-items>
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
      <v-dialog
        persistent
        hide-overlay
        no-click-animation
        transition="dialog-bottom-transition"
        width="700"
        content-class="bottom-dialog mb-0 ml-auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            rounded
            v-bind="attrs"
            v-on="on"
            color="primary"
            class="mt-3 ml-4 mb-1 elevation-0"
          >
            <v-icon left> mdi-pencil </v-icon> 写邮件
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar dense flat color="primary" dark height="36">
              <v-toolbar-title>
                <span style="font-size: 0.9em">新邮件</span>
              </v-toolbar-title>
              <v-spacer />
              <v-btn icon small @click="dialog.value = false"
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </v-toolbar>
            <v-card-text>
              <v-row>
                <v-col cols="12" class="pt-3 pb-1">
                  <v-text-field dense flat single-line hide-details>
                    <template v-slot:prepend-inner
                      ><p
                        class="pt-1 mb-0 text--disabled"
                        style="line-height: 20px"
                      >
                        收件人
                      </p>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="pt-0 pb-1">
                  <v-text-field
                    dense
                    flat
                    single-line
                    hide-details
                    placeholder="主题"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pt-0 pl-0">
                  <v-textarea
                    dense
                    flat
                    solo
                    single-line
                    hide-details
                    name="body"
                    rows="8"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                dense
                class="elevation-0"
                color="primary"
                @click="dialog.value = false"
                >发送</v-btn
              >
              <v-btn icon small><v-icon>mdi-paperclip</v-icon></v-btn>
              <v-spacer />
              <v-btn icon small>
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
              <v-btn icon small>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

      <v-list dense shaped>
        <v-list-item-group color="primary">
          <v-list-item exact to="/mail">
            <v-list-item-icon>
              <v-icon>mdi-inbox</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>收件箱</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item exact to="/mail/#starred">
            <v-list-item-icon>
              <v-icon>mdi-star-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>已加星标</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item exact to="/mail/#sent">
            <v-list-item-icon>
              <v-icon>mdi-send-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>已发邮件</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item exact to="/mail/#trash">
            <v-list-item-icon>
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>已删除邮件</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-subheader>标签</v-subheader>
          <v-list-item
            v-for="(item, i) in tags"
            :key="i"
            exact
            :to="`/mail/#tag/${item.name}`"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </template>
    <nuxt-child
      v-model="selected"
      :select-all="selectAll"
    />
  </container-flex>
</template>

<script>
export default {
  data: () => ({
    action: "",
    selectAll: false,
    selected: [],
    tags: [
      { name: "重要", icon: "mdi-bookmark-outline" },
      { name: "动态", icon: "mdi-information-outline" },
      { name: "待办", icon: "mdi-clock-time-four-outline" },
    ],
  }),
  methods: {},
  watch: {
    $route: {
      immediate: true,
      handler: function (to, from) {
        if (to.name === "mail-index") {
          this.action = "list";
        } else {
          const sections = to.name.split("-");
          this.action = sections.length > 2 && sections[2];
        }
      },
    },
  },
};
</script>

<style scoped>
* >>> .bottom-dialog {
  align-self: flex-end;
}
</style>