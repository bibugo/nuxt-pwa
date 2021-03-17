<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <blockquote class="blockquote">
          &#8220;{{ words }}&#8221;
          <footer>
            <small>
              <em>&mdash;{{ author }}</em>
            </small>
          </footer>
        </blockquote>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const { words, author } = await $axios.$get("/api/inspire");
    return { words, author };
  },
};
</script>
