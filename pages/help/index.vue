<template>
  <container-with-sidebar right>
    <template v-slot:sidebar-prepend>
      <v-sheet class="mt-4 mb-2"><h4>目 录</h4></v-sheet>
    </template>
    <template v-slot:sidebar>
      <v-row no-gutters
        ><v-divider vertical class="ml-4 mr-2" />
        <v-col>
          <v-treeview
            dense
            expand-icon="mdi-chevron-down"
            class="ml-n4"
            :items="toc"
            open-all
          >
            <template v-slot:label="{ item }">
              <nuxt-link :to="item.path" v-if="item.path !== url">{{
                item.title
              }}</nuxt-link>
              <span v-else>{{ item.title }}</span>
            </template>
          </v-treeview>
        </v-col>
      </v-row>
    </template>
    <nuxt-content :document="page" />
  </container-with-sidebar>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const root = "/help";

    const content = await $content(root, { deep: true })
      .only(["title", "path"])
      .sortBy("path")
      .fetch();

    function list2tree(list) {
      const map = {},
        roots = [];

      let i, node;
      for (i = 0; i < list.length; i += 1) {
        map[list[i].path] = i;
        list[i].id = i + 1;
        list[i].children = [];
      }
      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.path == `${root}/index`) {
          node.children.unshift({
            id: 0,
            title: "首页",
            path: node.path,
          });
          roots.push(node);
        } else {
          let parentdir = node.path.replace(/\/index$/, "");
          parentdir = parentdir.replace(/\/[^\/]+$/, "");
          parentdir = `${parentdir}/index`;
          list[map[parentdir]].children.push(node);
        }
      }
      return roots;
    }

    return { root, toc: list2tree(content)[0].children, url: "", page: null };
  },
  watch: {
    $route: {
      immediate: true,
      async handler(to) {
        this.url = to.path === this.root ? `${this.root}/index` : to.path;

        this.page = await this.$content(this.url)
          .fetch()
          .catch((err) => {
            this.$nuxt.error({ statusCode: 404 });
          });
      },
    },
  },
};
</script>
