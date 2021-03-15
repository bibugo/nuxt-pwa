<template>
  <v-menu offset-y v-if="value">
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        class="custom-badge"
        :content="messages"
        :value="messages"
        color="success"
        offset-x="20"
        offset-y="20"
      >
        <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-email</v-icon></v-btn>
      </v-badge>
    </template>
    <v-card max-width="350" class="mx-auto">
      <v-list three-line>
        <template v-for="(item, index) in items">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item v-else :key="item.title">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-html="
                  `<span class=&quot;text--primary&quot;>${item.sender}</span> &mdash; ${item.subtitle}`
                "
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    messages: 5,
    items: [
      { header: "Today" },
      {
        avatar: "/images/avatar/1.jpg",
        title: "Brunch this weekend?",
        sender: "Ali Connors",
        subtitle:
          "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
      },
      { divider: true, inset: true },
      {
        avatar: "/images/avatar/2.jpg",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        sender: "to Alex, Scott, Jennifer",
        subtitle: "Wish I could come, but I'm out of town this weekend.",
      },
      { divider: true, inset: true },
      {
        avatar: "/images/avatar/3.jpg",
        title: "Oui oui",
        sender: "Sandra Adams",
        subtitle: "Do you have Paris recommendations? Have you ever been?",
      },
      { divider: true, inset: true },
      {
        avatar: "/images/avatar/4.jpg",
        title: "Birthday gift",
        sender: "Trevor Hansen",
        subtitle:
          "Have any ideas about what we should get Heidi for her birthday?",
      },
      { divider: true, inset: true },
      {
        avatar: "/images/avatar/5.jpg",
        title: "Recipe to try",
        sender: "Britta Holt",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
      },
    ],
  }),
};
</script>