<template>
  <v-container pa-0 full-height>
    <v-toolbar dark dense flat src="/images/vbanner.jpg">
      <v-btn icon @click.stop="propMiniVariant = !propMiniVariant">
        <v-icon
          >mdi-{{ `chevron-${propMiniVariant ? "right" : "left"}` }}</v-icon
        >
      </v-btn>
      <v-spacer />
      <v-toolbar-title>Vuetify</v-toolbar-title>
      <template v-if="!propMiniVariant" v-slot:extension>
        <v-icon class="mr-2">mdi-account</v-icon>
        <span class="subtitle-1" style="margin-bottom: -2px"> {{ $auth.user.fullname }} </span>
        <v-spacer />
        <v-btn icon @click.stop="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
    <v-list nav flat dense>
      <v-list-item-group color="primary">
        <template v-for="(item, i) in items">
          <v-list-item
            exact
            v-if="!item.children || item.children.length < 1"
            :key="i"
            :to="item.to"
            router
          >
            <v-list-item-icon>
              <v-icon v-text="item.action"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group
            v-else
            :key="i"
            :prepend-icon="item.action"
            :value="item.active"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              exact
              v-for="(sub, j) in item.children"
              :to="sub.to"
              :key="j"
            >
              <v-list-item-content>
                <v-list-item-title v-text="sub.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
export default {
  props: ["miniVariant"],
  computed: {
    propMiniVariant: {
      get: function () {
        return this.miniVariant;
      },
      set: function (val) {
        this.$emit("update:miniVariant", val);
      },
    },
  },
  data: () => ({
    items: [
      {
        action: "mdi-apps",
        title: "Welcome",
        to: "/",
      },
      {
        action: "mdi-school",
        title: "Education",
        active: true,
        children: [
          { title: "Breakfast & brunch", to: "" },
          { title: "New American", to: "" },
          { title: "Sushi", to: "" },
        ],
      },
      {
        action: "mdi-run",
        title: "User",
        active: true,
        children: [
          { title: "User", to: "/user" },
          { title: "New", to: "/user/new" },
          { title: "Inspire", to: "/inspire" },
        ],
      },
    ],
    xxx: "mdi-close",
  }),
  methods: {
    logout() {
      this.$confirm("确定要退出系统吗?").then(async (result) => {
        if (!result) return;
        await this.$auth.logout();
        this.$auth.redirect("login");
      });
    },
  },
};
</script>