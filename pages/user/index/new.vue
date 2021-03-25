<template>
  <v-container fluid>
    <v-layout column>
      <v-form ref="form" v-model="valid" @submit.prevent="submit">
        <v-text-field
          v-model="data.username"
          :counter="10"
          :rules="[rules.required, rules.nospaces]"
          label="User Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="data.fullname"
          :rules="[rules.required]"
          label="Full Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="data.email"
          :rules="[rules.emailorempty]"
          label="E-mail"
        ></v-text-field>
        <v-text-field v-model="data.phone" label="Phone"></v-text-field>
        <v-text-field
          v-model="data.password"
          :rules="[rules.required, rules.nospaces]"
          label="Password"
          required
        ></v-text-field>

        <v-btn
          :loading="loading"
          :disabled="!valid"
          type="submit"
          color="success"
          class="mr-4"
        >
          Create User
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
          <v-icon>mdi-restore</v-icon>
        </v-btn>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    loading: false,
    data: {
      username: "",
      fullname: "",
      email: "",
      phone: "",
      password: "",
    },
    rules: {
      required: (v) => !!v || "Required.",
      minchars: (v) => v.length >= 3 || "Min 3 characters",
      nospaces: (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
      emailorempty: (v) => /.+@.+\..+/.test(v) || !v || "E-mail must be valid",
    },
  }),

  methods: {
    submit() {
      if (!this.$refs.form.validate()) return;
      this.loading = true;
      this.$axios.post("/api/user/new", this.data).then((res) => {
        if (!res.error) {
          this.$message({ content: "User created success", color: "success" });
          this.$refs.form.reset();
        }
        this.loading = false;
      });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  mounted() {
    console.log(this.crumbs);
  },
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath;
      const params = fullPath.startsWith("/")
        ? fullPath.substring(1).split("/")
        : fullPath.split("/");
      const crumbs = [];
      crumbs.push({ fullPath: "/", title: "首页" });
      let path = "";
      params.forEach((param, index) => {
        path = `${path}/${param}`;
        const match = this.$router.match(path);
        if (match.name !== null) {
          console.log(match.name);
          crumbs.push({
            title: param.replace(/-/g, " "),
            ...match,
          });
        }
      });
      return crumbs;
    },
  },
};
</script>
